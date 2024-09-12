import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { CarLoanSearchFilterComponent } from './car-loan-search-filter.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CarLoanService } from '../car-loan/car-loan.service';
import { By } from '@angular/platform-browser';

describe('CarLoanSearchFilterComponent', () => {
  let component: CarLoanSearchFilterComponent;
  let fixture: ComponentFixture<CarLoanSearchFilterComponent>;
  let carLoanService: CarLoanService;

  // This function will run before each test in the suite.
  beforeEach(async () => {
    // Configure the testing module.
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [CarLoanSearchFilterComponent],
      providers: [CarLoanService]
    })
      .compileComponents();


    fixture = TestBed.createComponent(CarLoanSearchFilterComponent); // Create the component through TestBed.
    component = fixture.componentInstance; // Get the instance of the component.
    carLoanService = TestBed.inject(CarLoanService); // Get the instance of the service.
    fixture.detectChanges(); // Trigger change detection for the component.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set errorMessage if fromDate or toDate is not set', () => {
    const form = <NgForm>{
      value: {
        fromDate: null,
        toDate: new Date()
      }
    };
    component.onSubmit(form);
    expect(component.errorMessage).toBe('Vul beide datums in');
  });

  it('should not set errorMessage if fromDate and toDate are set', () => {
    const form = <NgForm>{
      value: {
        fromDate: new Date(),
        toDate: new Date()
      }
    };
    component.onSubmit(form);
    expect(component.errorMessage).toBe('');
  });

  it('should call setDates when fromDate and toDate are set', () => {
    const form = <NgForm>{
      value: {
        fromDate: new Date(),
        toDate: new Date()
      }
    };
    spyOn(carLoanService, 'setDates');
    component.onSubmit(form);
    expect(carLoanService.setDates).toHaveBeenCalledWith(form.value.fromDate, form.value.toDate);
  });

  it('should change fuel type', () => {
    component.onFuelTypeChange('Diesel');
    expect(component.fuelType).toEqual('Diesel');
  });
});