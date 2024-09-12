import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DashboardSearchFilterService } from './dashboard-search-filter.service';

describe('DashboardSearchFilterService', () => {
  let service: DashboardSearchFilterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DashboardSearchFilterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch vehicles', () => {
    const mockVehicles = [
      {
        vehicleType: 'Auto',
        fuelType: 'LPG',
        gcorkm: 149,
      },
      {
        vehicleType: 'Auto',
        fuelType: 'plug-in hybride',
        gcorkm: 85,
      },
      {
        vehicleType: 'Bromfiets of scooter',
        fuelType: '100% elektrisch',
        gcorkm: 0,
      },
      {
        vehicleType: 'Bromfiets of scooter',
        fuelType: 'benzine',
        gcorkm: 59,
      },
    ];
    service.getVehicles().subscribe((vehicles) => {
      expect(vehicles.length).toBe(4);
      expect(vehicles).toEqual(mockVehicles);
    });

    const req = httpMock.expectOne('http://localhost:3002/vehicle');
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicles);
  });

  it('should fetch departments', () => {
    const mockDepartments = [{ department: 'Sales' }, { department: 'IT' }];

    service.getDepartments().subscribe((departments) => {
      expect(departments.length).toBe(2);
      expect(departments).toEqual(mockDepartments);
    });

    const req = httpMock.expectOne('http://localhost:3002/department');
    expect(req.request.method).toBe('GET');
    req.flush(mockDepartments);
  });

  it('should update query body', () => {
    const filters = {
      selectedDepartment: 'Department1',
      selectedVehicleType: 'VehicleType1',
      selectedFuelType: 'FuelType1',
    };

    service.updateQueryBody(filters);

    expect(service['queryBody']).toEqual({
      department: filters.selectedDepartment,
      vehicleType: filters.selectedVehicleType,
      fuelType: filters.selectedFuelType,
    });
  });
});
