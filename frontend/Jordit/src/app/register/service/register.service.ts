import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient,
  ) { }
private registerUrl = 'http://localhost:3002/signup';
private registerHeaders = {};


  sendInfoToBackend(email:string, department:string, password:string, passwordRepeat:string):Observable<object|never>{
  return this.http.post(this.registerUrl, {email, department, password, passwordRepeat} , this.registerHeaders).pipe(
    catchError(this.handleError('register', []))
  )
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
      return of(error.error as T)
    };
    
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
errorToUser(error:any){

}
}
