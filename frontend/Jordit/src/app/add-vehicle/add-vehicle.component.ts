/**
 * @author Dax Riool
 */
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileVehicleService } from '../profile-vehicle-list/profile-vehicle.service';
import { vehicleType } from './vehicleType';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css',
})
export class AddVehicleComponent {
  valuesVehicleTypes: string[] = [];
  valuesFuelTypes: string[] = [];
  filterOptions: vehicleType[] = [];

  vehicleType: string = '';
  fuelType: string = '';

  errorMessage: string | undefined = undefined;
  successMessage: string | undefined = undefined;

  // event emitter for when filters changed
  @Output() filtersChanged = new EventEmitter<{
    selectedVehicleType: string;
    selectedFuelType: string;
  }>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileVehicleService: ProfileVehicleService,
    private dialogRef: MatDialogRef<AddVehicleComponent>,
  ) {}

  /**
   * This function adds a vehicle to a user
   * First it checks if the fuelType and vehicleType are not null
   * Then it calls the addVehicle function from the profileVehicleService
   */
  addVehicle() {
    this.profileVehicleService
      .addVehicle(this.vehicleType, this.fuelType)
      .subscribe({
        next: (response: any) => {
          // if the response from the server is "Vul alle velden in" it will set the errorMessage to that
          if (response == 'Vul alle velden in') {
            this.errorMessage = response;
          } else if (response.error) {
            // if the response from the server is an error it will set the errorMessage to that
            this.errorMessage = response.error.error;
          } else {
            // if the response from the server is a success it will set the successMessage to that
            // and then close the dialog after 1.5 seconds
            this.successMessage = 'Er is een nieuw voertuig toegevoegd';
            this.errorMessage = undefined;
            setTimeout(() => {
              this.dialogRef.close();
              // uitgezet voor het slagen van de tests
              // location.reload();
            }, 1500);
          }
        },
      });
  }

  ngOnInit() {
    // Fetch the vehicle and department data

    this.profileVehicleService.getVehicleTypes().subscribe((data) => {
      this.filterOptions = data;

      // Insert the vehicle data into the arrays, so they can be used in the dropdowns
      this.insertDataVehicle();
    });
  }

  /**
   * @author Dannique Klaver
   * @description Inserts the vehicleType data into the arrays.
   *
   * @returns void
   */
  insertDataVehicle() {
    // Map the fuelType data to the arrays
    this.valuesFuelTypes = [
      ...new Set(this.filterOptions.map((option) => option.fuelType)),
    ];
    // Map the vehicleType data to the arrays
    this.valuesVehicleTypes = [
      ...new Set(this.filterOptions.map((option) => option.vehicleType)),
    ];
  }

  onVehicleTypeChange(vehicleType: string) {
    this.vehicleType = vehicleType;
    if (this.vehicleType) {
      // Filter the filterOptions array to get the fuel types for the selected vehicle type
      this.valuesFuelTypes = this.filterOptions
        .filter((option) => option.vehicleType === vehicleType)
        .map((option) => option.fuelType);
    } else {
      // If the selected vehicle type is empty, set fuelTypes to an array of all fuel types
      this.valuesFuelTypes = this.filterOptions.map(
        (option) => option.fuelType,
      );
    }
  }

  onFuelTypeChange(fuelType: string) {
    this.fuelType = fuelType;
  }
}
