import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  /**
   * The URl of the backend API
   */
  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) {}
  /**
   * The HTTP options to use for the API requests.
   */

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
    credentials: 'include',
  };

  /**
   * Retrieves a user by their email address.
   *
   * @param email - The email address of the user.
   * @returns An Observable that emits the User object.
   */

  getUser(): Observable<User> {
    return this.http
      .get<User>(this.apiUrl + '/user', { withCredentials: true })
      .pipe(catchError(this.handleError<User>('getUser')));
  }

  /**
   * Handles an HTTP operation that failed.
   * Allows the application to continue running.
   * @param operation - The name of the operation that failed.
   * @param result - An optional value to return as the observable result.
   * @returns A function that takes an error and returns an Observable with the specified result type.
   */

  private handleError<T>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    operation = 'operation',
    result?: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): (error: any) => Observable<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
