import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [LoginService],
      imports: [FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a success message if a user has logged in', (done) => {
    spyOn(loginService, 'checkLogin').and.returnValue(
      of({
        redirect: '/home',
      }),
    );

    component.email = 'test@jordit.com';
    component.password = 'test';

    component.checkUserInput();

    fixture.whenStable().then(() => {
      expect(component.succesMessage).toBe(
        'Succes, u word doorgeleid naar de homepagina',
      );
      expect(component.errorMessage).toBe(undefined);
      done();
    });
  });

  it('should return an error message if the email is not a jordit email', () => {
    component.email = 'test@hotmail.com';
    component.password = 'test';
    component.checkUserInput();
    expect(component.errorMessage).toBe(
      "Incorrecte email",
    );
  });
});
