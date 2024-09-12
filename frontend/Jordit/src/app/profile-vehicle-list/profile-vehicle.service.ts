import { Injectable } from '@angular/core';
import { vehiclesMock } from './profile-vehicle-list-mock';
import { Vehicle } from './vehicle';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { vehicleType } from '../add-vehicle/vehicleType';

@Injectable({
  providedIn: 'root',
})
export class ProfileVehicleService {
  private apiUrl = 'http://localhost:3002'; // URL to web api

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
    credentials: 'include',
  };
  /**
   * Retrieves the list of vehicles.
   * @returns {Array} The list of vehicles.
   */
  getVehicles(): Observable<Vehicle[]> {
    return this.http
      .get<
        Vehicle[]
      >(this.apiUrl + '/users/privatevehicles', { withCredentials: true })
      .pipe(catchError(this.handleError<Vehicle[]>('getVehicles', [])));
  }

  /**
   * Deletes a vehicle from the list.
   * @param {Object} vehicle - The vehicle object to be deleted.
   */
  deleteVehicle(vehicle: Vehicle): Observable<string> {
    return this.http
      .post<string>(this.apiUrl + '/users/delete/privatevehicle', vehicle, {
        withCredentials: true,
      })
      .pipe(catchError(this.handleError<string>('deleteVehicle', 'error')));
  }

  /**
   * Adds a vehicle to a user
   * @param vehicleType the type of vehicle out of the user input
   * @param fuelType the type of fuel out of the user input
   * @returns a string that says if the vehicle has been added or not
   */
  addVehicle(
    vehicleType: string | null,
    fuelType: string | null,
  ): Observable<string> {
    // check if the fuelType and vehicleType are not null
    if (fuelType && vehicleType != '') {
      // create a body with the vehicleType and fuelType
      const body = {
        vehicleType: vehicleType,
        fuelType: fuelType,
      };
      // call the post request to add a vehicle with the body and withCredentials true to send a cookie with the sessionId
      return this.http
        .post<string>(this.apiUrl + '/users/add/privatevehicle', body, {
          withCredentials: true,
        })
        .pipe(catchError(this.handleError<string>('addVehicle', 'error')));
    } else {
      // if the fuelType and vehicleType are null return a string that says "Vul alle velden in"
      return of('Vul alle velden in');
    }
  }

  getVehicleTypes(): Observable<vehicleType[]> {
    return this.http
      .get<vehicleType[]>(this.apiUrl + '/vehicle', { withCredentials: true })
      .pipe(catchError(this.handleError<vehicleType[]>('getVehicleTypes', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private handleError<T>(operation = 'operation', result?: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }
}
