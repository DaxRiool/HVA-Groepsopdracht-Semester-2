import { Component, EventEmitter, Output } from '@angular/core';
import { DashboardSearchFilterService } from './dashboard-search-filter.service';
import { DashboardService } from '../dashboard/dashboard.service';

/**
 * @author Dannique Klaver
 * @interface VehicleType
 * @description Interface for the vehicle type.
 */
export interface vehicleType {
  vehicleType: string;
  fuelType: string;
  gcorkm: number;
}

/**
 * @author Dannique Klaver
 * @interface Department
 * @description Interface for the department.
 */
export interface department {
  department: string;
}

@Component({
  selector: 'app-dashboard-search-filter',
  templateUrl: './dashboard-search-filter.component.html',
  styleUrl: './dashboard-search-filter.component.css',
})
/**
 * @author Dannique Klaver
 * @description This class includes properties and methods for filtering trips data.
 *
 * @method ngOnInit This method fetches the vehicle and department data on initialization.
 * @method insertDataVehicle This method inserts the vehicleType data into the arrays.
 * @method onCheckboxChange This method clears date inputs if "all time" checkbox is checked.
 * @method onDateChange This method sets the selected date.
 * @method onDepartmentChange This method sets the selected department.
 * @method onVehicleTypeChange This method sets the selected vehicle type and filters the fuel types for the selected vehicle type.
 * @method onFuelTypeChange This method sets the selected fuel type.
 * @method onSubmit This method emits the selected filters.
 * @method filtersChanged This event emitter is used for when filters changed.
 */
export class DashboardSearchFilterComponent {
  // initializing properties
  selectedFromDate: string = '';
  selectedToDate: string = '';
  allTime: boolean = false;

  filterOptions: vehicleType[] = [];
  fuelTypes: string[] = [];
  vehicleTypes: string[] = [];
  gcorkm: number[] = [];
  departments: department[] = [];

  selectedDepartment: string = '';
  selectedVehicleType: string = '';
  selectedFuelType: string = '';

  // searchEnabled is used to determine if the search button should be enabled
  searchEnabled: boolean = false;

  // event emitter for when filters changed
  @Output() filtersChanged = new EventEmitter<{
    selectedDepartment: string;
    selectedVehicleType: string;
    selectedFuelType: string;
  }>();

  constructor(
    private dashboardSearchFilterService: DashboardSearchFilterService,
  ) {}

  /**
   * @author Dannique Klaver
   * @description Fetches the vehicle and department data on initialization.
   *
   * @returns void
   */
  ngOnInit() {
    // Fetch the vehicle and department data
    this.dashboardSearchFilterService.getVehicles().subscribe((data) => {
      this.filterOptions = data;
      // Insert the vehicle data into the arrays, so they can be used in the dropdowns
      this.insertDataVehicle();
    });
    // Fetch the department data
    this.dashboardSearchFilterService.getDepartments().subscribe((data) => {
      this.departments = data;
    });

    // Set the default date range to be from today till one year back
    const today = new Date();
    const oneYearBack = new Date();
    oneYearBack.setFullYear(today.getFullYear() - 1);

    this.selectedFromDate = oneYearBack.toISOString().split('T')[0];
    this.selectedToDate = today.toISOString().split('T')[0];

    // Enable the search button since the date fields are initialized with values
    this.searchEnabled = true;
  }

  /**
   * @author Dannique Klaver
   * @description Inserts the vehicleType data into the arrays.
   *
   * @returns void
   */
  insertDataVehicle() {
    /**
     * This line of code creates a new Set from the fuelType property of each object in the filterOptions array.
     * A Set is a built-in JavaScript object that only allows unique values. So, this operation removes any duplicate fuelType values.
     * The Set is then converted back to an array using the spread operator (...) and assigned to the fuelTypes array.
     */
    this.fuelTypes = [
      ...new Set(this.filterOptions.map((option) => option.fuelType)),
    ];
    /**
     * It creates a new Set from the vehicleType property of each object in the filterOptions array, removes any duplicates, and assigns the result to the vehicleTypes array.
     */
    this.vehicleTypes = [
      ...new Set(this.filterOptions.map((option) => option.vehicleType)),
    ];
    /**
     * This line of code creates a new array from the gcorkm property of each object in the filterOptions array and assigns it to the gcorkm array.
     * Unlike the previous two operations, this one does not remove duplicates because it doesn't use a Set.
     */
    this.gcorkm = this.filterOptions.map((option) => option.gcorkm);
  }

  /**
   * @author Dannique Klaver
   * @description Clears date inputs if "all time" checkbox is checked.
   */
  onCheckboxChange() {
    if (this.allTime) {
      this.selectedFromDate = '';
      this.selectedToDate = '';
      // Enable the search button when the "all time" checkbox is checked
      this.searchEnabled = true;
    } else if (!this.selectedFromDate || !this.selectedToDate) {
      // Disable the search button when the "all time" checkbox is unchecked and the date fields are empty
      this.searchEnabled = false;
    }
  }

  /**
   * @author Dannique Klaver
   * @description Sets the selected filters.
   *
   * @param date - The selected date.
   * @param isFromDate - A boolean indicating if the date is the from date.
   */
  onDateChange(date: string, isFromDate: boolean) {
    // Set the fromDate or toDate depending on the isFromDate boolean
    if (isFromDate) {
      this.selectedFromDate = date;
    } else {
      this.selectedToDate = date;
    }

    // Enable the search button if both date fields are filled, otherwise disable it
    this.searchEnabled = !!this.selectedFromDate && !!this.selectedToDate;
  }

  /**
   * @author Dannique Klaver
   * @description Sets the selected department.
   *
   * @param department - The selected department.
   * @returns void
   */
  onDepartmentChange(department: string) {
    this.selectedDepartment = department;
  }

  /**
   * @author Dannique Klaver
   * @description Sets the selected vehicle type and filters the fuel types for the selected vehicle type.
   *
   * @param vehicleType - The selected vehicle type.
   * @returns void
   */
  onVehicleTypeChange(vehicleType: string) {
    this.selectedVehicleType = vehicleType;
    if (this.selectedVehicleType) {
      // Filter the filterOptions array to get the fuel types for the selected vehicle type
      this.fuelTypes = [
        ...new Set(
          this.filterOptions
            .filter((option) => option.vehicleType === vehicleType)
            .map((option) => option.fuelType),
        ),
      ];
    } else {
      // If the selected vehicle type is empty, set fuelTypes to an array of all fuel types
      this.fuelTypes = [
        ...new Set(this.filterOptions.map((option) => option.fuelType)),
      ];
    }
  }

  /**
   * @author Dannique Klaver
   * @description Sets the selected fuel type.
   *
   * @param fuelType - The selected fuel type.
   * @returns void
   */
  onFuelTypeChange(fuelType: string) {
    this.selectedFuelType = fuelType;
  }

  // event emitter for when filters submitted
  @Output() onSubmitted = new EventEmitter<{
    selectedDepartment: string;
    selectedVehicleType: string;
    selectedFuelType: string;
    selectedFromDate?: string;
    selectedToDate?: string;
  }>();

  /**
   * @author Dannique Klaver
   * @description Emits the selected filters.
   *
   * @returns void
   */
  onSubmit() {
    // send the selected filters to the parent component,
    // in the dashboard.component.html
    /**
     <app-dashboard-search-filter (filtersSubmitted)="onFiltersSubmitted($event)">
      </app-dashboard-search-filter>
     */
    this.onSubmitted.emit({
      selectedDepartment: this.selectedDepartment,
      selectedVehicleType: this.selectedVehicleType,
      selectedFuelType: this.selectedFuelType,
      selectedFromDate: this.selectedFromDate,
      selectedToDate: this.selectedToDate,
    });
  }
}
