/**
 * @author Dax Riool
 */
import { Component } from '@angular/core';
import { ProfileService } from './profile.service';
import { User } from './user';

/**
 * Represents the profile component of the application.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  /**
   * Creates an instance of ProfileComponent.
   * @param profileService The profile service used to retrieve user data.
   */
  constructor(private profileService: ProfileService) { }

  /**
   * Represents an empty user object.
   */
  user: User = {
    email: '',
    department: '',
    role: '',
  };

  /**
   * Retrieves the user data from the profile service.
   */
  getUser() {
    /**
     * Dit word veranderd wanneer de sessions worden geimplementeerd.
     */
    this.profileService.getUser().subscribe((user) => (this.user = user));
  }

  /**
   * Initializes the component by calling the getUser method.
   */
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.getUser();
  }
}
