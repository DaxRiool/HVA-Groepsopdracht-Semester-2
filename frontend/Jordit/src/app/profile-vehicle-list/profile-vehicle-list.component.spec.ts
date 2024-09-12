import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileVehicleListComponent } from './profile-vehicle-list.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfileVehicleListComponent', () => {
  let component: ProfileVehicleListComponent;
  let fixture: ComponentFixture<ProfileVehicleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileVehicleListComponent],
      imports: [FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
