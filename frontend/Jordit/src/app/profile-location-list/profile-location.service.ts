import { Injectable } from '@angular/core';
import { locationsMock } from './profile-location-list-mock';
import { Location } from './location';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ProfileLocationService {
  private apiUrl = 'http://localhost:3002'; // URL to web api

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
    credentials: 'include',
  };

  /**
   * Retrieves the locations.
   * @returns An array of locations.
   */
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl + '/users/locations', {withCredentials: true}).pipe(
      catchError(this.handleError<Location[]>('getVehicles', []))
    );
  }

  /**
   * Deletes a location.
   * @param location - The location to be deleted.
   */
  deleteLocation(location: Location) {
    const index = locationsMock.findIndex(
      (loc) =>
        loc.email === location.email && loc.location === location.location,
    );
    locationsMock.splice(index, 1);
    // window.location.reload();

    return;
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
      return of(result as T);
    };
  }
}
