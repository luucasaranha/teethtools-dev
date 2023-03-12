import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WrapperComponent} from './components/wrapper/wrapper.component';
import {CadastroComponent} from './components/cadastro/cadastro.component';
import {HomeComponent} from './components/home/home.component';
import {PatientsComponent} from './components/patients/patients.component';
import {SystemUnavailableComponent} from "../system-unavailable/system-unavailable.component";
import {UpdatePatientComponent} from "./components/update-patient/update-patient.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "@angular/fire/auth-guard";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {PatientsMetricsComponent} from "./components/patients-metrics/patients-metrics.component";

// const redirectToLogin() = () => redirectUnauthorizedTo(['login']);
// const redirectToHome() = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'cadastro',
        component: CadastroComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'patients',
        component: PatientsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'system-unavailable',
        component: SystemUnavailableComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'update-patient',
        component: UpdatePatientComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'login',
        component: LoginComponent,
        // canActivate: [AuthGuardService]
      },
      {
        path: 'patient-metrics',
        component: PatientsMetricsComponent,
        canActivate: [AuthGuardService]
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/system-unavailable',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
