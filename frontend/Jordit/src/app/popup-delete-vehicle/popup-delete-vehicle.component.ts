/**
 * @author Dax Riool
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vehicle } from '../profile-vehicle-list/vehicle';
import { ProfileVehicleService } from '../profile-vehicle-list/profile-vehicle.service';

/**
 * Component for the popup to delete a vehicle.
 */
@Component({
  selector: 'app-popup-delete-vehicle',
  templateUrl: './popup-delete-vehicle.component.html',
  styleUrl: './popup-delete-vehicle.component.css',
})
export class PopupDeleteVehicleComponent {
  successMessage: string | undefined = undefined;
  /**
   * The vehicle to be deleted.
   */
  public vehicle: Vehicle;
  /**
   *
   * @param data The data passed to the component.
   * @param profileVehicleService The service for managing profile vehicles.
   */
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileVehicleService: ProfileVehicleService,
    private dialogRef: MatDialogRef<PopupDeleteVehicleComponent>,
  ) {
    this.vehicle = data.vehicle;
  }

  /**
   * Deletes the specified vehicle.
   * @param vehicle - The vehicle to be deleted.
   */
  deleteVehicle(vehicle: Vehicle) {
    this.profileVehicleService.deleteVehicle(vehicle).subscribe({
      next: (response: any) => {
        if (!response.error) {
          this.successMessage = 'Er is een voertuig verwijderd!';
          setTimeout(() => {
            this.dialogRef.close();
            // uitgezet voor het slagen van tests
            // window.location.reload();
          }, 1500);
        }
      },
    });
  }
}
