import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Error404Component } from './components/error404/error404.component';
import { PanelComponent } from './components/panel/panel.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsIdentityComponent } from './components/settings-identity/settings-identity.component';
import { SettingsNameComponent } from './components/settings-name/settings-name.component';
import { SettingsBirthdayComponent } from './components/settings-birthday/settings-birthday.component';
import { SettingsEmailComponent } from './components/settings-email/settings-email.component';
import { SettingsPasswordComponent } from './components/settings-password/settings-password.component';
import { SavingsComponent } from './components/savings/savings.component';
import { PocketsComponent } from './components/pockets/pockets.component';
import { InvestmentsComponent } from './components/investments/investments.component';
import { InvestmentsCdtsComponent } from './components/investments-cdts/investments-cdts.component';
import { InvestmentsCreateComponent } from './components/investments-create/investments-create.component';
import { InvestmentsViewComponent } from './components/investments-view/investments-view.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  {
    path: 'panel',
    component: PanelComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          { path: '', redirectTo: 'identity', pathMatch: 'full' },
          { path: 'identity', component: SettingsIdentityComponent },
          { path: 'name', component: SettingsNameComponent },
          { path: 'birthday', component: SettingsBirthdayComponent },
          { path: 'email', component: SettingsEmailComponent },
          { path: 'password', component: SettingsPasswordComponent },
        ],
      },
      {
        path: 'savings',
        component: SavingsComponent,
      },
      {
        path: 'pockets',
        component: PocketsComponent,
      },
      {
        path: 'investments',
        component: InvestmentsComponent,
        children: [
          { path: '', component: InvestmentsCdtsComponent },
          { path: 'create', component: InvestmentsCreateComponent },
          { path: ':id', component: InvestmentsViewComponent },
        ],
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
