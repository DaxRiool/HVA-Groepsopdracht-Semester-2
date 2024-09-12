import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog'; // import MatDialogModule
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeDeletePopUpComponent } from './home-delete-pop-up.component';

describe('HomeDeletePopUpComponent', () => {
  let component: HomeDeletePopUpComponent;
  let fixture: ComponentFixture<HomeDeletePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeDeletePopUpComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      imports: [FormsModule, HttpClientTestingModule, MatDialogModule], // add MatDialogModule to imports
    }).compileComponents();

    fixture = TestBed.createComponent(HomeDeletePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});