import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Error404Component } from './components/error404/error404.component';
import { PanelComponent } from './components/panel/panel.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SavingsComponent } from './components/savings/savings.component';
import { SettingsIdentityComponent } from './components/settings-identity/settings-identity.component';
import { SettingsNameComponent } from './components/settings-name/settings-name.component';
import { SettingsBirthdayComponent } from './components/settings-birthday/settings-birthday.component';
import { SettingsEmailComponent } from './components/settings-email/settings-email.component';
import { SettingsPasswordComponent } from './components/settings-password/settings-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    Error404Component,
    PanelComponent,
    HomeComponent,
    LoadingComponent,
    SettingsComponent,
    SavingsComponent,
    SettingsIdentityComponent,
    SettingsNameComponent,
    SettingsBirthdayComponent,
    SettingsEmailComponent,
    SettingsPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
