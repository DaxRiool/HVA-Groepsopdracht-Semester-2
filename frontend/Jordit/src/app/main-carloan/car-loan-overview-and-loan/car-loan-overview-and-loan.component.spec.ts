import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarLoanOverviewAndLoanComponent } from './car-loan-overview-and-loan.component';
import { BusinessVehicle } from '../models/businessVechicle';
import { CarLoan } from '../models/carLoan';
import { PopUpFinalInformationComponent } from '../pop-up-final-information/pop-up-final-information.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PopUpCornfirmLoanComponent } from '../pop-up-cornfirm-loan/pop-up-cornfirm-loan.component';

describe('CarLoanOverviewAndLoanComponent', () => {
  let component: CarLoanOverviewAndLoanComponent;
  let fixture: ComponentFixture<CarLoanOverviewAndLoanComponent>;

  // Define mock objects
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

  const dialogRef = {
    afterClosed: () => of(true)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CarLoanOverviewAndLoanComponent, PopUpFinalInformationComponent],
      providers: [
        { provide: MatDialog }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CarLoanOverviewAndLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.fromDate = new Date();
    component.toDate = new Date();
  });

  it('should open the confirm loan popup', () => {
    spyOn(component.dialog, 'open').and.returnValue(dialogRef as any);

    component.openConfirmLoanPopup(mockVehicle);

    expect(component.dialog.open).toHaveBeenCalledWith(PopUpCornfirmLoanComponent, {
      data: {
        vehicle: mockVehicle,
        fromDate: component.fromDate,
        toDate: component.toDate
      }
    });
  });

  it('should create a loan when the confirm loan popup is confirmed', () => {
    spyOn(component.dialog, 'open').and.returnValue(dialogRef as any);
    spyOn(component, 'createLoan').and.returnValue(of(mockCarLoan));

    component.openConfirmLoanPopup(mockVehicle);

    expect(component.createLoan).toHaveBeenCalledWith(mockVehicle);
  });

  it('should open the final information popup when the confirm loan popup is confirmed', () => {
    spyOn(component.dialog, 'open').and.returnValue(dialogRef as any);
    spyOn(component, 'createLoan').and.returnValue(of(mockCarLoan));
    spyOn(component, 'openFinalInformationPopup');

    component.openConfirmLoanPopup(mockVehicle);

    expect(component.openFinalInformationPopup).toHaveBeenCalledWith(mockVehicle, mockCarLoan);
  });

  it('should clear search results when the confirm loan popup is confirmed', () => {
    spyOn(component.dialog, 'open').and.returnValue(dialogRef as any);
    spyOn(component, 'clearSearchResults');

    component.openConfirmLoanPopup(mockVehicle);

    expect(component.clearSearchResults).toHaveBeenCalled();
  });
});