import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent, Trip } from './dashboard.component';
import { DashboardSearchFilterComponent } from '../dashboard-search-filter/dashboard-search-filter.component';
import { DashboardService } from './dashboard.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: DashboardService;

  const dummyTrips: Trip[] = [
    {
      dateTime: '2022-01-01T00:00:00',
      department: 'R&D',
      travelType: 'woon-werk',
      vehicleType: 'Auto',
      fuelType: 'LPG',
      gcorkm: 149,
      km: 70,
      euro: 0,
      gco: 10430,
    },
    {
      dateTime: '2022-01-02T00:00:00',
      department: 'IT',
      travelType: 'zakelijk',
      vehicleType: 'Auto',
      fuelType: 'diesel',
      gcorkm: 154,
      km: 50,
      euro: 0,
      gco: 7700,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, DashboardSearchFilterComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        {
          provide: DashboardService,
          useValue: {
            getTrips: () => of(dummyTrips),
            getTripsBetweenDates: () => of(dummyTrips),
            calculateTotalCo2: () => 18130,
            calculateTotalKm: () => 120,
            calculateAvgCo2: () => 9065,
            getHighestPollutingDepartment: () => 'R&D',
            updateQueryBody: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch trips on initialization', () => {
    spyOn(dashboardService, 'getTrips').and.callThrough();
    component.ngOnInit();
    expect(dashboardService.getTrips).toHaveBeenCalled();
  });

  it('should call calculateTotalCo2 and return a number', () => {
    spyOn(dashboardService, 'calculateTotalCo2').and.callThrough();
    component.calculateData();
    expect(dashboardService.calculateTotalCo2).toHaveBeenCalled();
    expect(typeof component.totalCo2).toBe('number');
  });

  it('should call calculateTotalKm and return a number', () => {
    spyOn(dashboardService, 'calculateTotalKm').and.callThrough();
    component.calculateData();
    expect(dashboardService.calculateTotalKm).toHaveBeenCalled();
    expect(typeof component.totalKm).toBe('number');
  });

  it('should calculate total number of trips correctly', () => {
    component.calculateData();
    expect(typeof component.totalEntries).toBe('number');
  });

  it('should call calculateAvgCo2 and return a number', () => {
    spyOn(dashboardService, 'calculateAvgCo2').and.callThrough();
    component.calculateData();
    expect(dashboardService.calculateAvgCo2).toHaveBeenCalled();
    expect(typeof component.avgCo2).toBe('number');
  });

  it('should call getHighestPollutingDepartment and return a string', () => {
    spyOn(dashboardService, 'getHighestPollutingDepartment').and.callThrough();
    component.calculateData();
    expect(dashboardService.getHighestPollutingDepartment).toHaveBeenCalled();
    expect(typeof component.highestPollutingDepartment).toBe('string');
  });

  it('should fetch trips between dates correctly', () => {
    spyOn(dashboardService, 'getTripsBetweenDates').and.callThrough();
    component.fetchTripsBetweenDates('2022-01-01', '2022-01-02');
    expect(dashboardService.getTripsBetweenDates).toHaveBeenCalledWith(
      '2022-01-01',
      '2022-01-02',
    );
  });

  it('should update query body and fetch trips on filter submission', () => {
    spyOn(dashboardService, 'updateQueryBody').and.callThrough();
    spyOn(component, 'fetchTrips').and.callThrough();
    component.onSubmitted({
      selectedDepartment: 'IT',
      selectedVehicleType: 'Auto',
      selectedFuelType: 'diesel',
    });
    expect(dashboardService.updateQueryBody).toHaveBeenCalled();
    expect(component.fetchTrips).toHaveBeenCalled();
  });
});
