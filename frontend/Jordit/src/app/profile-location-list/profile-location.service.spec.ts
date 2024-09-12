import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileLocationService } from './profile-location.service';

describe('ProfileLocationService', () => {
  let service: ProfileLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // declarations: [ProfileLocationService],
    });
    service = TestBed.inject(ProfileLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
