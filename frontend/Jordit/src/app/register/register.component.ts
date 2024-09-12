import { Component } from '@angular/core';
import { RegisterService } from './service/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  /**
   * @author Ramon iro-omo
   * Register component is for the register page
   * uses the register service to make the posts
   */
  /**
   * these two public variables are for giving a red border to the input fields
   */
  public invalidEmail = false;
  public invalidPassword = false;
  /**@departments are the the departments that are listed in the front end! */
  private _departments: string[] = ['IT', 'human resourses', 'sales'];
  public get departments(): string[] {
    return this._departments;
  }
  public set departments(value: string[]) {
    this._departments = value;
  }
  /**@email is the email that the user puts in  */
  private _email: string | undefined = undefined;
  public get email(): string | undefined {
    return this._email;
  }
  public set email(value: string | undefined) {
    if (value && !value.endsWith('@jordit.com')) {
      this.invalidEmail = true;
      this.blackMessageToFront =
        'U kunt alleen registreren met het juiste email!';
      return;
    } else {
      this.blackMessageToFront = undefined;
      this.invalidEmail = false;
    }
    this._email = value;
  }
  /**@Password password that the user puts in*/
  private _password: string | undefined = undefined;
  public get password(): string | undefined {
    return this._password;
  }
  public set password(value: string | undefined) {
    const hasUpperCase = /[A-Z]/.test(value || '');
    if (value && (value.length < 8 || !hasUpperCase)) {
      this.blackMessageToFront =
        'minimaal 8 characters 1 hoofdletter en 2 cijfers!';
      this.invalidPassword = true;
      return;
    } else {
      this.invalidPassword = false;
      this.blackMessageToFront = undefined;
    }
    this._password = value;
  }
  private _chosenDepartment: string | undefined = undefined;
  public get chosenDepartment(): string | undefined {
    return this._chosenDepartment;
  }
  public set chosenDepartment(value: string | undefined) {
    this._chosenDepartment = value;
  }
  private _blackMessageToFront: string | undefined = undefined;
  public get blackMessageToFront(): string | undefined {
    return this._blackMessageToFront;
  }
  public set blackMessageToFront(value: string | undefined) {
    this._blackMessageToFront = value;
  }
  private _redMessageToFront: string | undefined = undefined;
  public get redMessageToFront(): string | undefined {
    return this._redMessageToFront;
  }
  public set redMessageToFront(value: string | undefined) {
    this._redMessageToFront = value;
  }
  private _passwordRepeat: string | undefined = undefined;
  public get passwordRepeat(): string | undefined {
    return this._password;
  }
  public set passwordRepeat(value: string | undefined) {
    this._passwordRepeat = value;
  }

  constructor(
    private registerService: RegisterService,
    private router: Router,
  ) {}

  /**
   * @method checkInput checks the input from the user into the registration form if the input is incorrect it gives back the right erro messages
   * @returns nothing
   */
  checkInput() {
    if (this.email && this.password && this.chosenDepartment) {
      this.register();
    } else {
      this.redMessageToFront = 'Vul alle velden in';
    }
  }

  /**
   * @method register Registers the user by calling the registerservice that will send the data to the backend and handle
   * the errors the
   * @param response response from the backend
   */
  public register() {
    this.registerService
      .sendInfoToBackend(
        this.email!,
        this.chosenDepartment!,
        this.password!,
        this.passwordRepeat!,
      )
      .subscribe({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        next: (response: any) => {
          if (response.redirect) {
            this.redirect(response);
          } else if (response.error) {
            this.redMessageToFront = response.error;
          }
        },
      });
  }

  /**
   * @method redirect redirects the user to the login page if registration was succsesfull
   * @param response is an object from the backend
   * @response status: 200 {redirect: 'login'}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public redirect(response: any) {
    this.blackMessageToFront = 'Succes, u word doorgeleid naar de login pagina';
    setTimeout(() => {
      this.router.navigate([response.redirect]);
    }, 1500);
  }
}
