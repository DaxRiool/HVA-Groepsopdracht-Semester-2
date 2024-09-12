import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarLoan } from '../models/carLoan';
import { BusinessVehicle } from '../models/businessVechicle';

@Component({
  selector: 'app-pop-up-final-information',
  templateUrl: './pop-up-final-information.component.html',
  styleUrls: ['./pop-up-final-information.component.css']
})
export class PopUpFinalInformationComponent {
  vehicle: BusinessVehicle;
  carLoan: CarLoan;

  constructor(
    public dialogRef: MatDialogRef<PopUpFinalInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.vehicle = data.vehicle;
    this.carLoan = data.carloan;
  }

  close() {
    this.dialogRef.close();
  }
}