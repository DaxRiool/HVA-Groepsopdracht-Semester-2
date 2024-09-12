import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileVehicleService } from './profile-vehicle.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('ProfileVehicleService', () => {
  let service: ProfileVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // add this line
    });
    service = TestBed.inject(ProfileVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an error message if the input is null', (done) => {
    service.addVehicle(null, null).subscribe(
      (response) => {
        expect(response).toEqual('Vul alle velden in');
        done();
      }
    );
  });
});