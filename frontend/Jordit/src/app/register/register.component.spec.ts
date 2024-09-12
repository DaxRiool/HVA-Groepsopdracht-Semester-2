import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterService } from './service/register.service';
import { of } from 'rxjs';

/**
 * @author Ramon iro-omo
 * het testen van de register component
 *
 */
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: RegisterService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientModule, FormsModule],
      providers: [RegisterService],
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RegisterService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect the user to the login page if the register is succsesfull [unit test]', () => {
    component.blackMessageToFront = '';
    component.redirect({ redirect: '/login' });

    expect(component.blackMessageToFront).toEqual(
      'Succes, u word doorgeleid naar de login pagina',
    );
  });
  
  it('if the user puts less than 8 characters in he should be notified [unit test]', () => {
    component.password = 'wachtwo'
    
    expect(component.invalidPassword).toEqual(true)
  
  }
  );
  

  it('should give a message if the user did not put all of the info in', () => {
    component.email = 'ramon@jordit.com';
    component.password = 'Password123';
    component.checkInput();

    expect(component.redMessageToFront).toBe('Vul alle velden in');
  });
  it('Should not redirect the user if the registration was not sucsesfull! [integration test]', (done) => {
    /**
     * here we simulate filling in all of the fields
     */
    component.email = 'ruben@jordit.com';
    component.password = 'Password123';
    component.chosenDepartment = 'IT';

    /**
     * here we make a stub for the method send info to the backend this is the last layer of our
     * call wich will go to the backend we set it to return the favoured return to simulate a succsesfull query
     * and we
     */
    spyOn(service, 'sendInfoToBackend').and.returnValue(of());

    /**
     * here we create a spy on the redirect method
     */
    const spy = spyOn(component, 'redirect');
    const registerSpy = spyOn(component, 'register');
    //act
    component.checkInput();
    /**
     * here we expect the spy to have been called
     */
    fixture.whenStable().then(() => {
      expect(registerSpy).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
      done();
    });
  });
});
