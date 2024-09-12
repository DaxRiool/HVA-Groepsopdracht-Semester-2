import { Injectable } from '@angular/core';
import { afgelopenRitten } from '../../mock/afgelopenRitten';
import { daysOfTheWeek } from '../../mock/daysOfTheWeek';
import { travel } from '../../mock/afgelopenRitten';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public afgelopenRitten
  public toDeleteObject:travel | null
  constructor() {
    this.afgelopenRitten = afgelopenRitten;
    this.toDeleteObject = null;
   }
  deleteRide(rideToDelete:travel){
    this.afgelopenRitten.splice(this.afgelopenRitten.indexOf(rideToDelete), 1);
  }

  callDeleteRide(){
    if(this.toDeleteObject){
      this.deleteRide(this.toDeleteObject)
    }
  }
  /**
   * 
   * @returns the past rides of the user
   */
  GetpastRides(){
    return this.afgelopenRitten;
  }

/**
 * 
 * @returns the days of the week
 */
  getDaysOfTheWeek(){
    return daysOfTheWeek;
  }

/**
 * 
 * @returns the stats of the user
 */
  getStats(){
     return {
      code:'500',
      error: 'Not implemented yet!'
     }
  }
}
