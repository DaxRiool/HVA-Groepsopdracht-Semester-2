import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpCornfirmLoanComponent } from './pop-up-cornfirm-loan.component';
import { businessVehicle } from '../models/interfaces/businessVechicle';
import { By } from '@angular/platform-browser';

describe('PopUpCornfirmLoanComponent', () => {
  let component: PopUpCornfirmLoanComponent;
  let fixture: ComponentFixture<PopUpCornfirmLoanComponent>;

  // Create a mock MatDialogRef with a spy on the 'close' method. This allows us to check if 'close' is called during our tests.
  const mockDialogRef = { close: jasmine.createSpy('close') };

  beforeEach(async () => {
    const mockVehicle: businessVehicle = {
      licensePlate: 'AB-C1-23',
      fuelType: 'benzine',
      vehicleType: 'Car'
    };

    // Configure the testing module.
    await TestBed.configureTestingModule({
      declarations: [PopUpCornfirmLoanComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            vehicle: mockVehicle,
            fromDate: new Date(),
            toDate: new Date(),
          }
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PopUpCornfirmLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should cancel on button click', () => {
    spyOn(component, 'cancel');
    const button = fixture.debugElement.query(By.css('.button'));
    button.triggerEventHandler('click');
    expect(component.cancel).toHaveBeenCalled();
  });
});