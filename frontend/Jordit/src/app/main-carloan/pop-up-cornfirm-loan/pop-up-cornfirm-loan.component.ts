import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { businessVehicle } from '../models/interfaces/businessVechicle';

@Component({
  selector: 'app-pop-up-cornfirm-loan',
  templateUrl: './pop-up-cornfirm-loan.component.html',
  styleUrls: ['./pop-up-cornfirm-loan.component.css']
})
export class PopUpCornfirmLoanComponent {
  selectedVehicle: businessVehicle;
  fromDate: Date;
  toDate: Date;

  constructor(
    public dialogRef: MatDialogRef<PopUpCornfirmLoanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedVehicle = data.vehicle; // Initialize the selectedVehicle property with the vehicle data passed in
    this.fromDate = data.fromDate; // Initialize the fromDate property with the fromDate data passed in
    this.toDate = data.toDate; // Initialize the toDate property with the toDate data passed in
  }

  cancel(): void {
    this.dialogRef.close();
  }
}