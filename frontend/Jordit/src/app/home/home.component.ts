import { Component, OnInit } from '@angular/core';
import { HomeService } from './service/home.service';
import { travel } from '../mock/afgelopenRitten';
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog';
import { HomeDeletePopUpComponent } from './home-delete-pop-up/home-delete-pop-up.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  dayOfTheWeek: {day:string, date:string}[];
  public afgelopenRitten: travel[];
  private toDeleteObject:travel
  UserStats:string[]

/**
 * @note this function should have a failsave for when the user tries to delete a ride that doesn't exist
 * @param rideToDelete lets a user delete a past ride
 */
  deleteRide(rideToDelete:travel){
    this.afgelopenRitten.splice(this.afgelopenRitten.indexOf(rideToDelete), 1);
  }

  public callDeleteRide(){
    this.deleteRide(this.toDeleteObject)
  }

  /**
   * 
   * routes the user to the right page
   * Right now it routes to a diffrent page
   */
toRide(){
  this.router.navigate(['/car-loan']);
}

  /**
   * 
   * @returns the stats of the user
   */
  getStats(){
  return this.homeservice.getStats().code;
  }

  openPopUp(afgelopenRit:travel) {
    this.dialog.open(HomeDeletePopUpComponent);
    this.homeservice.toDeleteObject = afgelopenRit
  }

  constructor(private homeservice:HomeService, private router:Router,private dialog: MatDialog) {
    this.dayOfTheWeek = [];
    this.afgelopenRitten = [];
    this.UserStats = [];
    this.toDeleteObject = {
      dateTime: '',
      email: '',
      travelDate: '',
      locationFrom: '',
      locationTo: '',
      gco: '',
      travelType: ''
    };
  }

  ngOnInit(): void {
    this.dayOfTheWeek = this.homeservice.getDaysOfTheWeek();
    this.afgelopenRitten = this.homeservice.GetpastRides();
  }
}
