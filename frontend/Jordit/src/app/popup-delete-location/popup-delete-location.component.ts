/**
 * @author Dax Riool
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileLocationService } from '../profile-location-list/profile-location.service';
import { Location } from '../profile-location-list/location';

/**
 * Represents the component for the popup to delete a location.
 */
@Component({
  selector: 'app-popup-delete-location',
  templateUrl: './popup-delete-location.component.html',
  styleUrl: './popup-delete-location.component.css',
})
export class PopupDeleteLocationComponent {
  /**
   * The location to be deleted.
   */
  public location: Location;

  /**
   * Constructs a new instance of the PopupDeleteLocationComponent.
   * @param data The data passed to the component.
   * @param profileLocationService The service for managing profile locations.
   */
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileLocationService: ProfileLocationService) {
    this.location = data.location;
  }

  /**
   * Deletes the specified location.
   * @param location The location to be deleted.
   */
  deleteLocation(location: Location) {
    this.profileLocationService.deleteLocation(location);
  }
}
