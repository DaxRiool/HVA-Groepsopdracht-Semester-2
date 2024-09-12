import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BusinessVehicle } from '../models/businessVechicle';
import { CarLoan } from '../models/carLoan';
import { CarLoanService } from '../car-loan/car-loan.service';
import { PopUpCornfirmLoanComponent } from '../pop-up-cornfirm-loan/pop-up-cornfirm-loan.component';
import { PopUpFinalInformationComponent } from '../pop-up-final-information/pop-up-final-information.component';
import { BaseComponent } from '../models/base.component';

@Component({
  selector: 'app-car-loan-overview-and-loan',
  templateUrl: './car-loan-overview-and-loan.component.html',
  styleUrls: ['./car-loan-overview-and-loan.component.css']
})
export class CarLoanOverviewAndLoanComponent extends BaseComponent {
  constructor(
    carLoanService: CarLoanService,
    public dialog: MatDialog,
    public router: Router
  ) {
    super(carLoanService);
  }

  ngOnInit(): void {
    this.subscribeToBusinessVehicles();
    this.subscribeToDates();
  }
  /**
   * This method sets up a subscription to the businessVehicle$ observable in the carLoanService.
   * The businessVehicle$ observable is a stream of BusinessVehicle arrays. Each time a new array is emitted,
   * this method updates the local businessVehicle property with that new array.
   * This structure allows the component to reactively update whenever the business vehicles data changes.
   */
  private subscribeToBusinessVehicles(): void {
    this.carLoanService.businessVehicle$.subscribe((businessVehicles: BusinessVehicle[]) => {
      this.businessVehicle = businessVehicles;
    });
  }
  /**
   * This method sets up subscriptions to the fromDate$ and toDate$ observables in the carLoanService.
   * The fromDate$ and toDate$ observables are streams of Dates. Each time a new date is emitted,
   * this method updates the local fromDate or toDate property with that new date.
   * This structure allows the component to reactively update whenever the from date or to date changes.
   */
  private subscribeToDates(): void {
    this.carLoanService.fromDate$.subscribe(fromDate => {
      this.fromDate = fromDate;
    });
    this.carLoanService.toDate$.subscribe(toDate => {
      this.toDate = toDate;
    });
  }
  /**
   * Opens a confirmation popup for loaning a vehicle.
   * If no vehicle is selected, it sets an error message.
   * If a vehicle is selected, it opens a dialog with the selected vehicle and dates.
   * After the dialog is closed, it creates a loan for the selected vehicle and opens a final information popup.
   * It also clears the search results.
   *
   * @param {BusinessVehicle} selectedVehicle
   */
  openConfirmLoanPopup(selectedVehicle: BusinessVehicle): void {
    if (!selectedVehicle) {
      this.errorMessage = 'Selecteer eerst een auto om te lenen.';
    } else {
      const dialogRef = this.dialog.open(PopUpCornfirmLoanComponent, {
        data: {
          vehicle: selectedVehicle,
          fromDate: this.fromDate,
          toDate: this.toDate
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.createLoan(selectedVehicle).subscribe(carloan => {
            this.openFinalInformationPopup(selectedVehicle, carloan);
          });
          this.clearSearchResults();
        }
      });
    }
  }

  /**
   * @description Opens a final information popup for the loaned vehicle.
   * After the dialog is closed, it navigates the user back to the home page.
   *
   * @param {BusinessVehicle} selectedVehicle - The vehicle that the user has loaned.
   * @param {CarLoan} carLoan - The details of the car loan.
   */
  openFinalInformationPopup(selectedVehicle: BusinessVehicle, carLoan: CarLoan): void {
    const dialogRef = this.dialog.open(PopUpFinalInformationComponent, {
      data: {
        vehicle: selectedVehicle,
        carloan: carLoan
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  /**
 * @description Creates a car loan for the selected vehicle and dates.
 * If the fromDate, toDate, or selectedVehicle are not defined, it throws an error.
 * Otherwise, it calls the createLoan method in the carLoanService with the license plate of the selected vehicle and the dates.
 *
 * @param {BusinessVehicle} selectedVehicle - The vehicle that the user has selected to loan.
 * @returns {Observable<CarLoan>} An Observable that will emit the created CarLoan.
 * @throws {Error} If fromDate, toDate, or selectedVehicle are not defined.
 */
  createLoan(selectedVehicle: BusinessVehicle): Observable<CarLoan> {
    if (!this.fromDate || !this.toDate || !selectedVehicle) {
      throw new Error('fromDate and toDate must be defined and a vehicle must be selected to create a loan.');
    }
    return this.carLoanService.createLoan(selectedVehicle.licensePlate, this.fromDate, this.toDate);
  }

  /**
   * Clears the search results.
   */
  clearSearchResults(): void {
    this.businessVehicle = [];
  }
}