import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { department, vehicleType } from './dashboard-search-filter.component';

@Injectable({
  providedIn: 'root',
})
/**
 * @author Dannique Klaver
 * @description This class includes properties and methods for fetching vehicle and department data.
 *
 * @method getVehicles This method fetches vehicle data from the server.
 * @method getDepartments This method fetches department data from the server.
 * @method updateQueryBody This method updates the query body with the selected filters.
 * @method queryBody This method returns the query body.
 * @method urlVehicle This method returns the vehicle url.
 * @method urlDepartment This method returns the department url.
 */
export class DashboardSearchFilterService {
  // initializing the queryBody object
  private queryBody: {
    department?: string;
    vehicleType?: string;
    fuelType?: string;
  } = {};
  // url to fetch vehicle data
  private urlVehicle = 'http://localhost:3002/vehicle';
  // url to fetch department data
  private urlDepartment = 'http://localhost:3002/department';

  constructor(private http: HttpClient) { }

  /**
   * @author Dannique Klaver
   * @description Fetches vehicle data from the server.
   *
   * @returns Observable<VehicleType[]> - An observable of the vehicle data, Observable is a stream of data that can be subscribed to.
   */
  getVehicles(): Observable<vehicleType[]> {
    return this.http.get<vehicleType[]>(this.urlVehicle, { withCredentials: true });
  }

  /**
   * @author Dannique Klaver
   * @description Fetches department data from the server.
   *
   * @returns Observable<Department[]> - An observable of the department data, Observable is a stream of data that can be subscribed to.
   */
  getDepartments(): Observable<department[]> {
    return this.http.get<department[]>(this.urlDepartment, { withCredentials: true });
  }

  /**
   * @author Dannique Klaver
   * @description Updates the query body with the selected filters.
   *
   * @param filters - An object containing the selected department, vehicle type, and fuel type.
   * @returns void
   */
  updateQueryBody(filters: {
    selectedDepartment: string;
    selectedVehicleType: string;
    selectedFuelType: string;
  }) {
    //
    this.queryBody = {
      department: filters.selectedDepartment,
      vehicleType: filters.selectedVehicleType,
      fuelType: filters.selectedFuelType,
    };
  }
}
