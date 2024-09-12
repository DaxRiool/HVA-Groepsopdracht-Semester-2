import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './dashboard.component';
import { environment } from '../environment';

// injectable decorator to inject the service into other components
@Injectable({
  providedIn: 'root',
})
/**
 * @author Dannique Klaver
 * @description This class includes properties and methods for fetching and calculating data related to trips.
 *
 * @method getTrips This method fetches trips data from the server.
 * @method updateQueryBody This method updates the query body with the selected filters.
 * @method calculateTotalCo2 This method calculates the total CO2 emissions.
 * @method calculateTotalKm This method calculates the total distance.
 * @method calculateAvgCo2 This method calculates the average CO2 emissions.
 * @method getHighestPollutingDepartment This method calculates the highest polluting department.
 */
export class DashboardService {
  // queryBody object to store the selected filters
  private queryParams: {
    department?: string;
    vehicleType?: string;
    fuelType?: string;
  } = {};
  constructor(private http: HttpClient) {}

  /**
   * @author Dannique Klaver
   * @description Fetches trips data from the server.
   *
   * @returns Observable<Trip[]> - An observable of the trips data, Observable is a stream of data that can be subscribed to.
   */
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(environment.API_URL + '/dashboard',  {
      params: this.queryParams,
    });
  }

  getTripsBetweenDates(start: string, end: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      `${environment.API_URL}/dashboard/${start}/${end}`,
      {
        params: this.queryParams,
      },
    );
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
    this.queryParams = {
      department: filters.selectedDepartment,
      vehicleType: filters.selectedVehicleType,
      fuelType: filters.selectedFuelType,
    };
  }

  /**
   * @author Dannique Klaver
   * @description Calculates the total CO2 emissions.
   *
   * @param trips - An array of trip objects.
   * @returns number - The total CO2 emissions.
   */
  calculateTotalCo2(trips: Trip[]): number {
    return trips.reduce((sum, trip) => sum + trip.km * trip.gcorkm, 0);
  }

  /**
   * @author Dannique Klaver
   * @description Calculates the total distance.
   *
   * @param trips - An array of trip objects.
   * @returns number - The total distance.
   */
  calculateTotalKm(trips: Trip[]): number {
    return trips.reduce((sum, trip) => sum + Number(trip.km), 0);
  }

  /**
   * @author Dannique Klaver
   * @description Calculates the average CO2 emissions.
   *
   * @param totalCo2 - The total CO2 emissions.
   * @param totalEntries - The total number of entries.
   * @returns number - The average CO2 emissions.
   */
  calculateAvgCo2(totalCo2: number, totalEntries: number): number {
    if (totalCo2 === 0 || totalEntries === 0) {
      return 0;
    }
    const avgCo2 = totalCo2 / totalEntries;
    return Number(avgCo2.toFixed(2));
  }

  /**
   * @author Dannique Klaver
   * @description Calculates the highest polluting department.
   *
   * @param trips - An array of trip objects.
   * @returns string - The highest polluting department.
   */
  getHighestPollutingDepartment(trips: Trip[]): string {
    // Create an object to store the total CO2 emissions per department
    const departmentGco: { [key: string]: number } = {};

    // Loop through the trips array and calculate the total CO2 emissions per department
    trips.forEach((trip) => {
      if (!departmentGco[trip.department]) {
        departmentGco[trip.department] = 0;
      }
      departmentGco[trip.department] += trip.km * trip.gcorkm;
    });

    // If the departmentGco object is empty, return 'Geen'
    if (Object.keys(departmentGco).length === 0) {
      return 'Geen';
    }

    // Return the department with the highest total CO2 emissions
    return Object.keys(departmentGco).reduce((a, b) =>
      departmentGco[a] > departmentGco[b] ? a : b,
    );
  }
}
