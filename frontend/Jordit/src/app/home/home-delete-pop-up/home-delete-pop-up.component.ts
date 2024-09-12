import { Component } from '@angular/core';
import { HomeService } from '../service/home.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-home-delete-pop-up',
  templateUrl: './home-delete-pop-up.component.html',
  styleUrl: './home-delete-pop-up.component.css'
})
export class HomeDeletePopUpComponent {

  constructor(private homeservice:HomeService,public dialogRef: MatDialogRef<HomeDeletePopUpComponent>){}

  delete(){
    this.homeservice.callDeleteRide()
    this.dialogRef.close();
  }
  cancelDelete(){
    this.dialogRef.close();
  }

}
