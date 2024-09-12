import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdministrationComponent } from './administration.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AdministrationService } from './administration.service';

class MockAdministrationService {
  getUser() {
    return of({
      email: '',
      department: '',
      role: '',
    });
  }
}

describe('AdministrationComponent', () => {
  let component: AdministrationComponent;
  let fixture: ComponentFixture<AdministrationComponent>;
  let administrationService: AdministrationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: AdministrationService, useClass: MockAdministrationService },
      ],
    }).compileComponents();

    administrationService = TestBed.inject(AdministrationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Met martijn gereviewd. toberTrue weg
  it('should show "Wagenpark Beheer" for "beheerder"', async () => {
    component.user.role = 'beheerder';
    fixture.detectChanges();
    await fixture.whenStable();
    const wagenparkBeheerBlock = fixture.debugElement.query(
      By.css('a[routerLink="/wagenpark-beheer"]'),
    );
    expect(wagenparkBeheerBlock).toBeTruthy();
  });

  it('should block "Wagenpark Beheer" for "gebruiker"', async () => {
    component.user.role = 'gebruiker';
    fixture.detectChanges();
    await fixture.whenStable();
    const wagenparkBeheerArticle = fixture.debugElement.query(
      By.css('a[routerLink="/wagenpark-beheer"] article'),
    );
    expect(wagenparkBeheerArticle).toBeFalsy();
  });

  it('should show "Personeels Beheer" for "beheerder"', async () => {
    component.user.role = 'beheerder';
    fixture.detectChanges();
    await fixture.whenStable();
    const personeelsBeheerBlock = fixture.debugElement.query(
      By.css('a[routerLink="/personeel-beheer"]'),
    );
    expect(personeelsBeheerBlock).toBeTruthy();
  });

  it('should block "Personeels Beheer" for "gebruiker"', async () => {
    component.user.role = 'gebruiker';
    fixture.detectChanges();
    await fixture.whenStable();
    const personeelsBeheerArticle = fixture.debugElement.query(
      By.css('a[routerLink="/personeel-beheer"] article'),
    );
    expect(personeelsBeheerArticle).toBeFalsy();
  });

  it('should show "CO2 Dashboard" for "beheerder" and "management"', async () => {
    component.user.role = 'beheerder';
    fixture.detectChanges();
    await fixture.whenStable();
    let co2DashboardBlock = fixture.debugElement.query(
      By.css('a[routerLink="/dashboard"]'),
    );
    expect(co2DashboardBlock).toBeTruthy();

    component.user.role = 'management';
    fixture.detectChanges();
    await fixture.whenStable();
    co2DashboardBlock = fixture.debugElement.query(
      By.css('a[routerLink="/dashboard"]'),
    );
    expect(co2DashboardBlock).toBeTruthy();
  });

  it('should block "CO2 Dashboard" for "gebruiker"', async () => {
    component.user.role = 'gebruiker';
    fixture.detectChanges();
    await fixture.whenStable();
    const co2DashboardArticle = fixture.debugElement.query(
      By.css('a[routerLink="/dashboard"] article'),
    );
    expect(co2DashboardArticle).toBeFalsy();
  });

  it('should show "Contact" block for "gebruiker"', async () => {
    component.user.role = 'gebruiker';
    fixture.detectChanges();
    await fixture.whenStable();
    const contactArticle = fixture.debugElement.query(
      By.css('a[routerLink="/contact"] article'),
    );
    expect(contactArticle).toBeTruthy();
  });
});
