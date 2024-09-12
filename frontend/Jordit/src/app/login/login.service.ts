/**
 * @author Dax Riool
 */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  /**
   * The URL of the API
   */
  private apiUrl = 'http://localhost:3002'; // URL to web api

  /**
   *
   * @param http the HttpClient
   */
  constructor(private http: HttpClient) {}

  /**
   * The httpOptions for the requests
   */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
    credentials: 'include', 
  };

  /**
   * Here the login of the user gets handled
   * @param email the email of the user
   * @param password the password of the user
   * @returns an observable with the response
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkLogin(email: string, password: string): Observable<any> {
    return this.http
      .post(this.apiUrl + '/login', { email, password }, this.httpOptions)
      .pipe(catchError(this.handleError('checkLogin', [])));
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
      console.error(error.error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(error.error as T);
    };
  }
}
