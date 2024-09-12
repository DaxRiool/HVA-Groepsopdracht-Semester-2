import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersoneelBeheerComponent } from './personeel-beheer.component';

describe('PersoneelBeheerComponent', () => {
  let component: PersoneelBeheerComponent;
  let fixture: ComponentFixture<PersoneelBeheerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersoneelBeheerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersoneelBeheerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
