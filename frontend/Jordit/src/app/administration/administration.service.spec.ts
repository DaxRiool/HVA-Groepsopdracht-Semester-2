import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AdministrationService } from './administration.service';
import { User } from '../profile/user';
import { environment } from '../environment';

describe('AdministrationService', () => {
  let service: AdministrationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdministrationService],
    });

    service = TestBed.inject(AdministrationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the user', () => {
    const dummyUser: User = {
      email: 'john.doe@jordit.com',
      department: 'IT',
      role: 'beheerder',
    };

    service.getUser().subscribe((user) => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/user`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });
});
