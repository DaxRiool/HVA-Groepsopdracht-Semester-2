/**
 * @author Dax Riool
 */
import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // The email of the user
  email: string | null = null;
  // The password of the user
  password: string | null = null;
  // The error message element
  errorMessage: undefined | string = undefined;
  // The success message element
  succesMessage: undefined | string = undefined;

  /**
   * In the constructor the login service and the router gets injected
   * @param loginService The login service where the login gets handled
   * @param router The router to navigate to different pages
   */
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  /**
   * In this function the user input gets checked for errors
   */
  checkUserInput() {
    // Check if the email and password are filled in
    if (!this.email || !this.password) {
      this.errorMessage = 'Vul alle velden in';
      // Check if the email is a jordit email
    } else if (!this.email.endsWith('@jordit.com')) {
      this.errorMessage =
        "Incorrecte email";
      return;
    } else {
      // If the email and password are filled in and the email is a jordit email, the login gets checked
      this.checkLogin(this.email, this.password);
    }
  }

  /**
   * @addition The function takes the response from the backend annd redirects them to the response page 
   * In this function the login gets checked
   * @param email The email of the user
   * @param password The password of the user
   */
  checkLogin(email: string, password: string) {
    this.loginService.checkLogin(email, password).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (response: any) => {
       if (response.redirect) {
        this.succesMessage = 'Succes, u word doorgeleid naar de homepagina';
        this.errorMessage = undefined;
        setTimeout(() => {
          this.router.navigate([response.redirect]);
        }, 1500);
      } else if (response.error) {
          this.errorMessage = response.error;
      }}
    });
  }
}

