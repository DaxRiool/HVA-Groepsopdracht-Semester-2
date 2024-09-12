import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { ProfileLocationListComponent } from '../profile-location-list/profile-location-list.component';
import { ProfileVehicleListComponent } from '../profile-vehicle-list/profile-vehicle-list.component';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profileService: ProfileService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent, ProfileLocationListComponent, ProfileVehicleListComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [ProfileService],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileComponent);
    profileService = TestBed.inject(ProfileService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


it('should get the user data and display it E2E', fakeAsync(() => {
  // This creates a spy on the getUser method of the profileService
  spyOn(profileService, 'getUser').and.returnValue(
    of({ email: 'test@jordit.com', department: 'ICT', role: 'Admin'}),
  );

  // Call the ngOnInit method
  component.ngOnInit();

  tick(); // Simulate the passage of time until all pending asynchronous activities finish

  fixture.detectChanges(); // Update the view with the new data

  // Get the email and department from the html
  const email = fixture.nativeElement.querySelector('#email').textContent.trim();
  const department = fixture.nativeElement.querySelector('#department').textContent.trim();

  // Check if the email and department are displayed correctly
  expect(email).toBe('test@jordit.com');
  expect(department).toBe('ICT');
}));
});
