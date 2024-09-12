import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupDeleteVehicleComponent } from './popup-delete-vehicle.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileVehicleService } from '../profile-vehicle-list/profile-vehicle.service';
import { of } from 'rxjs';

/**
 * Om deze tests te laten slagen moet de location.reload() in de AddVehicleComponent uitgecomment worden
 */
describe('PopupDeleteVehicleComponent', () => {
  let component: PopupDeleteVehicleComponent;
  let fixture: ComponentFixture<PopupDeleteVehicleComponent>;
  let profileVehicleService: ProfileVehicleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupDeleteVehicleComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            vehicle: { email: 'dax', vehicleType: 'auto', fuel: 'benzine' },
          },
        },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        ProfileVehicleService,
      ],
      imports: [FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupDeleteVehicleComponent);
    component = fixture.componentInstance;
    profileVehicleService = TestBed.inject(ProfileVehicleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a private vehicle E2E', (done) => {
    // This creates a spy on the deleteVehicle method of the profileVehicleService
    const spyVehicleService = spyOn(
      profileVehicleService,
      'deleteVehicle',
    ).and.returnValue(of('Er is een voertuig verwijderd!'));

    // Call the deleteVehicle method
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    // Wait for the asynchronous addVehicle call to complete
    // this has to be done because the addVehicle returns a observable and that is asynchronous
    fixture.whenStable().then(() => {
      // Check if the successMessage is set correctly
      expect(component.successMessage).toBe('Er is een voertuig verwijderd!');
      // Check if the errorMessage is set correctly
      expect(spyVehicleService).toHaveBeenCalled();
      done();
    });
  });
});
