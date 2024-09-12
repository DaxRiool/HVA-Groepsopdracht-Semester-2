import { NgForm } from '@angular/forms';
import { Component, Injectable, OnDestroy } from '@angular/core';
import { CarLoanService } from '../car-loan/car-loan.service';
import { vehicleType } from '../../dashboard-search-filter/dashboard-search-filter.component';
import { BaseComponent } from '../models/base.component';
import { BusinessVehicle } from '../models/businessVechicle';

/**
 * @author Storm Verwer
 * @description This component handles the car loan search filter functionality.
 */
@Component({
  selector: 'app-car-loan-search-filter',
  templateUrl: './car-loan-search-filter.component.html',
  styleUrls: ['./car-loan-search-filter.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class CarLoanSearchFilterComponent extends BaseComponent implements OnDestroy {
  constructor(
    carLoanService: CarLoanService,
  ) {
    super(carLoanService);
  }

  ngOnInit() {
    this.carLoanService.getVehicles().subscribe((vehicles: vehicleType[]) => {
      this.fuelTypes = vehicles.map(vehicle => vehicle.fuelType);
    });
  }

  /**
   * @description Handles the fuel type change.
   * @param {string} newFuelType - The new fuel type.
   */
  onFuelTypeChange(newFuelType: string) {
    this.fuelType = newFuelType;
  }

  /**
   * @description Handles the form submission.
   * @param {NgForm} form - The submitted form.
   */
  onSubmit(form: NgForm) {
    this.errorMessage = '';

    if (!form.value.fromDate || !form.value.toDate) {
      this.errorMessage = 'Vul beide datums in';
    } else {
      let params = {
        fromDate: new Date(form.value.fromDate),
        toDate: new Date(form.value.toDate),
        fuelType: this.fuelType || 'noFuelType',
      };
      this.carLoanService.setDates(params.fromDate, params.toDate);

      this.carLoanService
        .getBusinessVehicles(params.fromDate, params.toDate, params.fuelType)
        .subscribe({
          next: (businessVehicles: BusinessVehicle[]) => {
            this.carLoanService.updateBusinessVehicles(businessVehicles);
          },
          error: (error) => {
            console.error('An error occurred:', error);
            this.errorMessage =
              error.error.error ||
              'An error occurred while fetching business vehicles.';
          },
        });
    }
  }
  /**
   * @description Clears the business vehicles on component destruction.
   */
  ngOnDestroy() {
    this.carLoanService.clearBusinessVehicles();
  }
}
