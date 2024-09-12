import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardSearchFilterComponent } from './dashboard-search-filter.component';
import { DashboardSearchFilterService } from './dashboard-search-filter.service';
import { of } from 'rxjs';

describe('DashboardSearchFilterComponent', () => {
  let component: DashboardSearchFilterComponent;
  let fixture: ComponentFixture<DashboardSearchFilterComponent>;
  let dashboardSearchFilterService: DashboardSearchFilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardSearchFilterComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [DashboardSearchFilterService],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSearchFilterComponent);
    component = fixture.componentInstance;
    dashboardSearchFilterService = TestBed.inject(DashboardSearchFilterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.allTime).toBeFalse();
    expect(component.searchEnabled).toBeTrue();
    expect(component.selectedDepartment).toEqual('');
    expect(component.selectedVehicleType).toEqual('');
    expect(component.selectedFuelType).toEqual('');
  });

  it('should fetch vehicle and department data on init', () => {
    spyOn(dashboardSearchFilterService, 'getVehicles').and.returnValue(of([]));
    spyOn(dashboardSearchFilterService, 'getDepartments').and.returnValue(
      of([]),
    );
    component.ngOnInit();
    expect(dashboardSearchFilterService.getVehicles).toHaveBeenCalled();
    expect(dashboardSearchFilterService.getDepartments).toHaveBeenCalled();
  });

  it('should update date and searchEnabled properties when onCheckboxChange is called', () => {
    component.allTime = true;
    component.onCheckboxChange();
    expect(component.selectedFromDate).toEqual('');
    expect(component.selectedToDate).toEqual('');
    expect(component.searchEnabled).toBeTrue();

    component.allTime = false;
    component.selectedFromDate = '';
    component.selectedToDate = '';
    component.onCheckboxChange();
    expect(component.searchEnabled).toBeFalse();
  });

  it('should update selectedFromDate and selectedToDate properties when onDateChange is called', () => {
    component.onDateChange('2022-01-01', true);
    expect(component.selectedFromDate).toEqual('2022-01-01');
    component.onDateChange('2022-12-31', false);
    expect(component.selectedToDate).toEqual('2022-12-31');
  });

  it('should update selectedDepartment property when onDepartmentChange is called', () => {
    component.onDepartmentChange('Department1');
    expect(component.selectedDepartment).toEqual('Department1');
  });

  it('should update selectedVehicleType property and filter fuelTypes when onVehicleTypeChange is called', () => {
    component.filterOptions = [
      { vehicleType: 'VehicleType1', fuelType: 'FuelType1', gcorkm: 10 },
      { vehicleType: 'VehicleType2', fuelType: 'FuelType2', gcorkm: 25 },
    ];
    component.onVehicleTypeChange('VehicleType1');
    expect(component.selectedVehicleType).toEqual('VehicleType1');
    expect(component.fuelTypes).toEqual(['FuelType1']);
  });

  it('should update selectedFuelType property when onFuelTypeChange is called', () => {
    component.onFuelTypeChange('FuelType1');
    expect(component.selectedFuelType).toEqual('FuelType1');
  });
  it('should emit onSubmitted event when onSubmit is called', () => {
    spyOn(component.onSubmitted, 'emit');
    component.onSubmit();
    expect(component.onSubmitted.emit).toHaveBeenCalled();
  });
});
