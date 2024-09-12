import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BusinessVehicle } from '../models/businessVechicle';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarLoan } from '../models/carLoan';
import { vehicleType } from '../../dashboard-search-filter/dashboard-search-filter.component';

/**
 * @author Storm Verwer
 * @fileoverview: Service for the car loan components.
 */

@Injectable({
    providedIn: 'root'
})
export class CarLoanService {
    private urlCars = 'http://localhost:3002/cars';
    private urlvehicleType = 'http://localhost:3002/vehicle';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true,
        Credential: 'include',
    };
    constructor(private http: HttpClient) { }

    // Private BehaviorSubject that will hold the current value of  data
    private _businessVehicle = new BehaviorSubject<BusinessVehicle[]>([]);
    // Public Observable that will be used by other parts of the application to subscribe to the data
    public businessVehicle$ = this._businessVehicle.asObservable();

    /**
   * @description Fetches available business vehicles 
   * @param {Date} fromDate - The start date.
   * @param {Date} toDate - The end date.
   * @param {string} fuelType - The fuel type.
   * @returns {Observable<BusinessVehicle[]>} - The business vehicles.
   */
    getBusinessVehicles(fromDate: Date, toDate: Date, fuelType: string): Observable<BusinessVehicle[]> {
        return this.http.get<BusinessVehicle[]>(`${this.urlCars}/${fromDate}/${toDate}/${encodeURIComponent(fuelType)}`, { withCredentials: true });
    }

    /**
   * @description Updates the business vehicles if a new search is done.
   * @param {BusinessVehicle[]} vehicles - The new business vehicles.
   */
    updateBusinessVehicles(vehicles: BusinessVehicle[]) {
        this._businessVehicle.next(vehicles);
    }

    clearBusinessVehicles(): void {
        this._businessVehicle.next([]);
    }

    private fromDateSource = new BehaviorSubject<Date | null>(null);
    private toDateSource = new BehaviorSubject<Date | null>(null);


    fromDate$ = this.fromDateSource.asObservable();
    toDate$ = this.toDateSource.asObservable();

    /**
   * Creates a loan.
   * @param {string} licensePlate - The license plate.
   * @param {Date} startDate - The start date.
   * @param {Date} endDate - The end date.
   * @returns {Observable<CarLoan>} - The response containing the CarLoan information.
   */
    createLoan(licensePlate: string, startDate: Date, endDate: Date): Observable<CarLoan> {
        return this.http.post<CarLoan>(`${this.urlCars}/loan`, { licensePlate, startDate, endDate }, { withCredentials: true });
    }

    /**
     * Sets the from and to dates.
     * @param {Date} fromDate - The from date.
     * @param {Date} toDate - The to date.
     */
    setDates(fromDate: Date, toDate: Date) {
        this.fromDateSource.next(fromDate);
        this.toDateSource.next(toDate);
    }

    /**
     * Gets the vehicles.
     * @returns {Observable<vehicleType[]>} - The vehicles to later get the fueltype.
     */
    getVehicles(): Observable<vehicleType[]> {
        return this.http.get<vehicleType[]>(this.urlvehicleType, { withCredentials: true });
    }

}