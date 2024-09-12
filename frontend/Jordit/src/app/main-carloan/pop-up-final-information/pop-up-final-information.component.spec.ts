import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpFinalInformationComponent } from './pop-up-final-information.component';
import { BusinessVehicle } from '../models/businessVechicle';
import { CarLoan } from '../models/carLoan';
import { By } from '@angular/platform-browser';

describe('PopUpFinalInformationComponent', () => {
  let component: PopUpFinalInformationComponent;
  let fixture: ComponentFixture<PopUpFinalInformationComponent>;

  // A mock MatDialogRef object with a spy on the 'close' method.
  // By spying on the 'close' method, we can check if and when it's called, helping us to verify that our component interacts correctly with the dialog.
  const mockDialogRef = { close: jasmine.createSpy('close') };

  // This function will run before each test in the suite.
  beforeEach(async () => {
    const mockVehicle: BusinessVehicle = new BusinessVehicle(
      'AB-C1-23',
      'benzine', 
      'auto'
    );
    const mockCarLoan: CarLoan = new CarLoan(
      'test@example.com',
      'AB-C1-23',
      new Date(),
      new Date()
    );

    // Configure the testing module.
    await TestBed.configureTestingModule({
      declarations: [PopUpFinalInformationComponent],
      imports: [
        MatDialogModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            vehicle: mockVehicle,
            carloan: mockCarLoan,
          }
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PopUpFinalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test if the component is created successfully.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on button click', () => {
    spyOn(component, 'close');
    const button = fixture.debugElement.query(By.css('.button'));
    button.triggerEventHandler('click');
    expect(component.close).toHaveBeenCalled();
  });
});