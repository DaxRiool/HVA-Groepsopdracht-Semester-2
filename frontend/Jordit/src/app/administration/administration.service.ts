import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../profile/user';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  constructor(private http: HttpClient) {}

  /**
   * The HTTP options to use for the API requests.
   */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };

  /**
   * @author Dannique Klaver
   * Retrieves a user by their email address.
   *
   * @param email - The email address of the user.
   * @returns An Observable that emits the User object.
   */
  getUser(): Observable<User> {
    return this.http
      .get<User>(environment.API_URL + '/user', { withCredentials: true })
      .pipe(
        catchError((error) => {
          return throwError('Something bad happened; please try again later.');
        }),
      );
  }
}
