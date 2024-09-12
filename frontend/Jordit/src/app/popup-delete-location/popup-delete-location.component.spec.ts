import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupDeleteLocationComponent } from './popup-delete-location.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PopupDeleteLocationComponent', () => {
  let component: PopupDeleteLocationComponent;
  let fixture: ComponentFixture<PopupDeleteLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupDeleteLocationComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { email: 'dax', location: 'thuis' },
        },
      ],
      imports: [FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupDeleteLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
