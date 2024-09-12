import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarLoanComponent } from './main-carloan/car-loan/car-loan.component';
import { ProfileComponent } from './profile/profile.component';
import { AdministrationComponent } from './administration/administration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersoneelBeheerComponent } from './personeel-beheer/personeel-beheer.component';
import { WagenparkBeheerComponent } from './wagenpark-beheer/wagenpark-beheer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  /**
   * here you can add paths that you want to navigate to
   *
   */
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'car-loan', component: CarLoanComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'personeel-beheer', component: PersoneelBeheerComponent },
  { path: 'wagenpark-beheer', component: WagenparkBeheerComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
