/**
 * @file administration.component.ts
 * @author Dannique Klaver
 * @description This file contains the AdministrationComponent class which controls the administration page.
 */

import { Component } from '@angular/core';
import { AdministrationService } from './administration.service';
import { User } from '../profile/user';

/**
 * @author Dannique Klaver
 * @description The AdministrationComponent class controls the administration page.
 */
@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
})
export class AdministrationComponent {
  constructor(private administrationService: AdministrationService) {}

  /**
   * Represents an empty user object.
   */
  user: User = {
    email: '',
    department: '',
    role: '',
  };

  // Define the access rights for each role
  private roleAccess: { [key: string]: string[] } = {
    beheerder: ['Wagenpark Beheer', 'Personeels Beheer', 'CO2 Dashboard'],
    management: ['CO2 Dashboard'],
    gebruiker: ['Contact'],
  };

  /**
   * @author Dannique Klaver
   * Retrieves the user data from the profile service.
   */
  getUser() {
    this.administrationService.getUser().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error fetching user:', error);
        // Initialize user with default values to prevent errors
        this.user = {
          email: '',
          department: '',
          role: '',
        };
      },
    );
  }

  /**
   * Initializes the component by calling the getUser method.
   */
  ngOnInit() {
    this.getUser();
  }

  /**
   * @author Dannique Klaver
   * @description This method checks if the user has access to a given link.
   * @param {string} link - The link to check access for.
   * @returns {boolean} - Returns true if the user has access, false otherwise.
   */
  hasAccess(link: string): boolean {
    return this.roleAccess[this.user.role]?.includes(link) ?? false;
  }
}
