import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarLoanComponent } from './main-carloan/car-loan/car-loan.component';
import { CarLoanSearchFilterComponent } from './main-carloan/car-loan-search-filter/car-loan-search-filter.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ProfileVehicleListComponent } from './profile-vehicle-list/profile-vehicle-list.component';
import { ProfileLocationListComponent } from './profile-location-list/profile-location-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupDeleteVehicleComponent } from './popup-delete-vehicle/popup-delete-vehicle.component';
import { PopupDeleteLocationComponent } from './popup-delete-location/popup-delete-location.component';
import { provideHttpClient } from '@angular/common/http';
import { AdministrationComponent } from './administration/administration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersoneelBeheerComponent } from './personeel-beheer/personeel-beheer.component';
import { WagenparkBeheerComponent } from './wagenpark-beheer/wagenpark-beheer.component';
import { DashboardSearchFilterComponent } from './dashboard-search-filter/dashboard-search-filter.component';
import { CarLoanOverviewAndLoanComponent } from './main-carloan/car-loan-overview-and-loan/car-loan-overview-and-loan.component';

import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { HomeDeletePopUpComponent } from './home/home-delete-pop-up/home-delete-pop-up.component';
import { LoginComponent } from './login/login.component';
import { PopUpCornfirmLoanComponent } from './main-carloan/pop-up-cornfirm-loan/pop-up-cornfirm-loan.component';
import { PopUpFinalInformationComponent } from './main-carloan/pop-up-final-information/pop-up-final-information.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarLoanComponent,
    CarLoanSearchFilterComponent,
    ProfileComponent,
    ProfileVehicleListComponent,
    ProfileLocationListComponent,
    NavbarComponent,
    PopupDeleteVehicleComponent,
    PopupDeleteLocationComponent,
    AdministrationComponent,
    NavbarComponent,
    DashboardComponent,
    DashboardSearchFilterComponent,
    PersoneelBeheerComponent,
    WagenparkBeheerComponent,
    DashboardSearchFilterComponent,
    AddVehicleComponent,
    CarLoanOverviewAndLoanComponent,
    HomeDeletePopUpComponent,
    LoginComponent,
    PopUpCornfirmLoanComponent,
    PopUpFinalInformationComponent,
    RegisterComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration(), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
