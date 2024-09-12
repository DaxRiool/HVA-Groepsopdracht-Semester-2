/**
 * @author Dax Riool
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddVehicleComponent } from './add-vehicle.component';
import { ProfileVehicleService } from '../profile-vehicle-list/profile-vehicle.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';


/**
 * Om deze tests te laten slagen moet de location.reload() in de AddVehicleComponent uitgecomment worden
 */
describe('AddVehicleComponent', () => {
  let component: AddVehicleComponent;
  let fixture: ComponentFixture<AddVehicleComponent>;
  let profileVehicleService: ProfileVehicleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVehicleComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        ProfileVehicleService,
      ],
      imports: [FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddVehicleComponent);
    component = fixture.componentInstance;
    profileVehicleService = TestBed.inject(ProfileVehicleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a success message if a user has added a vehicle', (done) => {
    // This creates a spy on the addVehicle method of the profileVehicleService
    // we call .and.returnValue(of('Er is een nieuw voertuig toegevoegd'))
    // to return a observable with the value 'Er is een nieuw voertuig toegevoegd' for testing purposes
    spyOn(profileVehicleService, 'addVehicle').and.returnValue(
      of('Er is een nieuw voertuig toegevoegd'),
    );

    // Set vehicleType and fuelType to valid values
    component.vehicleType = 'auto';
    component.fuelType = 'benzine';

    // Call the addVehicle method
    component.addVehicle();

    // Wait for the asynchronous addVehicle call to complete
    // this has to be done because the addVehicle returns a observable and that is asynchronous
    fixture.whenStable().then(() => {
      // Check if the successMessage is set correctly
      expect(component.successMessage).toBe(
        'Er is een nieuw voertuig toegevoegd',
      );
      // Check if the errorMessage is set correctly
      expect(component.errorMessage).toBe(undefined);
      done();
    });
  });

  /**
   * This test checks if the addVehicle method sets the errorMessage correctly
   */
  it('should return a error message if a user didnt fill in all the fields', (done) => {
    spyOn(profileVehicleService, 'addVehicle').and.returnValue(
      of('Vul alle velden in'),
    );
    // Set vehicleType and fuelType to valid values
    component.vehicleType = '';
    component.fuelType = '';

    // Call the addVehicle method
    component.addVehicle();

    // Wait for the asynchronous addVehicle call to complete
    // Check if the errorMessage is set correctly
    fixture.whenStable().then(() => {
      // Check if the errorMessage is set correctly
      expect(component.errorMessage).toBe('Vul alle velden in');
      expect(component.successMessage).toBe(undefined);
      done();
    });
  });

  /**
   * This test checks if the addVehicle method sets the errorMessage correctly
   */
  it('should return a error message if a user didnt fill in the vehicleType', (done) => {
    spyOn(profileVehicleService, 'addVehicle').and.returnValue(
      of('Vul alle velden in'),
    );
    // Set vehicleType and fuelType to valid values
    component.vehicleType = '';
    component.fuelType = 'benzine';

    // Call the addVehicle method
    component.addVehicle();

    // Wait for the asynchronous addVehicle call to complete
    // Check if the errorMessage is set correctly
    fixture.whenStable().then(() => {
      // Check if the errorMessage is set correctly
      expect(component.errorMessage).toBe('Vul alle velden in');
      expect(component.successMessage).toBe(undefined);
      done();
    });
  });

  /**
   * This test checks if the addVehicle method sets the errorMessage correctly
   */
  it('should return a error message if a user didnt fill in the fuelType', (done) => {
    spyOn(profileVehicleService, 'addVehicle').and.returnValue(
      of('Vul alle velden in'),
    );
    // Set vehicleType and fuelType to valid values
    component.vehicleType = 'Auto';
    component.fuelType = '';

    // Call the addVehicle method
    component.addVehicle();

    // Wait for the asynchronous addVehicle call to complete
    // Check if the errorMessage is set correctly
    fixture.whenStable().then(() => {
      // Check if the errorMessage is set correctly
      expect(component.errorMessage).toBe('Vul alle velden in');
      expect(component.successMessage).toBe(undefined);
      done();
    });
  });

  it('should add a vehicle E2E', (done) => {
    const spyVehicleService = spyOn(profileVehicleService, 'addVehicle').and.returnValue(
      of('Er is een nieuw voertuig toegevoegd'),
    );

    // the input of the html gets filled in with values
    fixture.nativeElement.querySelector('#vehicleType').value = 'auto';
    fixture.nativeElement.querySelector('#fuelType').value = 'benzine';

    // simulates a click on the submit button
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    
    // updates the component
    fixture.detectChanges()

    // gets the succes message
    const succesMessage = fixture.nativeElement.querySelector('#succes').textContent;

    // The element should be null because the errorMessage is not set
    const errorMessage = fixture.nativeElement.querySelector('#error');
    

    // Wait for the asynchronous addVehicle call to complete
    // this has to be done because the addVehicle returns a observable and that is asynchronous
    fixture.whenStable().then(() => {
      // Check if the successMessage is set correctly
      expect(succesMessage).toBe(
        'Er is een nieuw voertuig toegevoegd',
      );
      // Check if the errorMessage is set correctly
      expect(errorMessage).toBe(null);
      expect(spyVehicleService).toHaveBeenCalled();
      done();
    });
  });
});
