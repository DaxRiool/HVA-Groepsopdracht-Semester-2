import { Component } from '@angular/core';
import { ProfileVehicleService } from './profile-vehicle.service';
import { Vehicle } from './vehicle';
import { MatDialog } from '@angular/material/dialog';
import { PopupDeleteVehicleComponent } from '../popup-delete-vehicle/popup-delete-vehicle.component';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';

/**
 * Component for displaying and managing a list of profile vehicles.
 */
@Component({
  selector: 'app-profile-vehicle-list',
  templateUrl: './profile-vehicle-list.component.html',
  styleUrl: './profile-vehicle-list.component.css',
})
export class ProfileVehicleListComponent {
  constructor(
    private profileVehicleService: ProfileVehicleService,
    private popUpRef: MatDialog,
  ) {}

  /**
   * Array of vehicles with properties email, vehicleType, and fuel.
   */
  vehicles: Vehicle[] = [];

  /**
   * Retrieves the vehicles from the profile vehicle service.
   */
  getVehicles() {
    /**
     * Dit word veranderd wanneer de sessions worden geimplementeerd.
     */
    this.profileVehicleService
      .getVehicles()
      .subscribe((vehicles) => (this.vehicles = vehicles));      
  }

  /**
   * Initializes the component by retrieving the vehicles.
   */
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.getVehicles();
  }

  openPopupDeleteVehicle(userVehicle: Vehicle) {
    this.popUpRef.open(PopupDeleteVehicleComponent, {
      data: {
        vehicle: userVehicle,
      },
    });
  }

  openPopupAddVehicle() {
    this.popUpRef.open(AddVehicleComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
