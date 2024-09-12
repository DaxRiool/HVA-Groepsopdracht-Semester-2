import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagenparkBeheerComponent } from './wagenpark-beheer.component';

describe('WagenparkBeheerComponent', () => {
  let component: WagenparkBeheerComponent;
  let fixture: ComponentFixture<WagenparkBeheerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WagenparkBeheerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WagenparkBeheerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
