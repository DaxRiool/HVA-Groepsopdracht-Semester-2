import { Component } from '@angular/core';
import { ProfileLocationService } from './profile-location.service';
import { Location } from './location';
import { MatDialog } from '@angular/material/dialog';
import { PopupDeleteLocationComponent } from '../popup-delete-location/popup-delete-location.component';

/**
 * Represents the Profile Location List component.
 * This component is responsible for displaying and managing the list of user locations.
 */
@Component({
  selector: 'app-profile-location-list',
  templateUrl: './profile-location-list.component.html',
  styleUrl: './profile-location-list.component.css',
})
export class ProfileLocationListComponent {
  constructor(
    private profileLocationService: ProfileLocationService,
    private popUpRef: MatDialog,
  ) {}

  /**
   * An array of user locations.
   * Each location object contains an email, a location and a check if their popup is open.
   */
  locations: Location[] = [];

  /**
   * Retrieves the user locations from the profile location service.
   * Assigns the retrieved locations to the 'locations' property.
   */
  getLocations() {
    /**
     * Dit word veranderd wanneer de sessions worden geimplementeerd.
     */
    this.profileLocationService
      .getLocations()
      .subscribe((locations) => (this.locations = locations));
  }

  /**
   * Initializes the component.
   * This method is called after the component has been created and initialized.
   * It is a lifecycle hook that is provided by Angular.
   */
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.getLocations();
  }

  /**
   * Opens the popup for deleting a location.
   * @param userLocation The location to be deleted.
   */
  openPopupLocation(userLocation: Location) {
    this.popUpRef.open(PopupDeleteLocationComponent, {
      data: {
        location: userLocation,
      },
    });
  }
}
