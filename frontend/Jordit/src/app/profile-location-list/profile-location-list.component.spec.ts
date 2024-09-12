import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLocationListComponent } from './profile-location-list.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfileLocationListComponent', () => {
  let component: ProfileLocationListComponent;
  let fixture: ComponentFixture<ProfileLocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileLocationListComponent],
      imports: [FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
