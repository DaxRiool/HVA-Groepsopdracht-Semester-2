import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  const dummyTrips = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService],
    });

    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate total CO2 emissions correctly', () => {
    const totalCo2 = service.calculateTotalCo2(dummyTrips);
    expect(totalCo2).toEqual(18130);
  });

  it('should calculate total kilometers correctly', () => {
    const totalKm = service.calculateTotalKm(dummyTrips);
    expect(totalKm).toEqual(120);
  });

  it('should calculate average CO2 emissions correctly', () => {
    const avgCo2 = service.calculateAvgCo2(18130, 2);
    expect(avgCo2).toEqual(9065);
  });

  it('should calculate the department with the highest CO2 emissions correctly', () => {
    const highestPollutingDepartment =
      service.getHighestPollutingDepartment(dummyTrips);
    expect(highestPollutingDepartment).toEqual('R&D');
  });
});
