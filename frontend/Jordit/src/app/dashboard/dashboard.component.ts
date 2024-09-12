import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

export interface Trip {
  dateTime: string;
  department: string;
  travelType: string;
  vehicleType: string;
  fuelType: string;
  gcorkm: number;
  km: number;
  euro: number;
  gco: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
/**
 * @class DashboardComponent
 * @description This class includes properties and methods for displaying and calculating data related to trips.
 */
export class DashboardComponent implements OnInit {
  // initializing properties
  trips: Trip[] = [];
  totalCo2: number = 0;
  totalCo2Kg: number = 0;
  totalKm: number = 0;
  totalEntries: number = 0;
  avgCo2: number = 0;
  highestPollutingDepartment: string = '';
  errorMessage: string = '';

  constructor(private dashboardService: DashboardService) {}

  /**
   * @description Fetches trips data from the server on initialization.
   */
  ngOnInit() {
    this.fetchTrips();
  }

  /**
   * @author Dannique Klaver
   * @description Fetches trips data from the server.
   */
  fetchTrips() {
    this.dashboardService.getTrips().subscribe((data) => {
      this.trips = data;
      this.calculateData();
    });
  }

  fetchTripsBetweenDates(start: string, end: string) {
    this.dashboardService.getTripsBetweenDates(start, end).subscribe(
      (data) => {
        this.trips = data;
        this.calculateData();
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = error.error.error;
      },
    );
  }

  /**
   * @author Dannique Klaver
   * @description Calculates total CO2 emissions, total distance, average CO2 emissions, and the highest polluting department.
   * @returns void
   */
  calculateData() {
    this.totalCo2 = this.dashboardService.calculateTotalCo2(this.trips);
    this.totalCo2Kg = this.totalCo2 / 1000;
    this.totalKm = this.dashboardService.calculateTotalKm(this.trips);
    this.totalEntries = this.trips.length;
    this.avgCo2 = this.dashboardService.calculateAvgCo2(
      this.totalCo2,
      this.totalEntries,
    );
    this.highestPollutingDepartment =
      this.dashboardService.getHighestPollutingDepartment(this.trips);
  }

  /**
   * @author Dannique Klaver
   * @description Updates the query body with the selected filters and fetches trips data from the server.
   * this method is defined in the DashboardSearchFilterService.
   *
   * @param filters - An object containing the selected department, vehicle type, and fuel type.
   * @returns void
   */
  onSubmitted(filters: {
    selectedDepartment: string;
    selectedVehicleType: string;
    selectedFuelType: string;
    selectedFromDate?: string;
    selectedToDate?: string;
  }) {
    // Update the query body with the selected filters.
    this.dashboardService.updateQueryBody(filters);
    // Check if dates are provided
    if (filters.selectedFromDate && filters.selectedToDate) {
      this.dashboardService.updateQueryBody(filters);

      const selectedFromDate = filters.selectedFromDate;
      const selectedToDate = filters.selectedToDate;
      // Fetch trips data from the server now that the query body has been updated.
      this.fetchTripsBetweenDates(selectedFromDate, selectedToDate);
    } else {
      // Fetch all trips data with the selected filters
      this.fetchTrips();
    }
  }
}
