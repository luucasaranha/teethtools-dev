import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WrapperComponent} from './components/wrapper/wrapper.component';
import {CadastroComponent} from './components/cadastro/cadastro.component';
import {HomeComponent} from './components/home/home.component';
import {PatientsComponent} from './components/patients/patients.component';
import {SystemUnavailableComponent} from "../system-unavailable/system-unavailable.component";
import {UpdatePatientComponent} from "./components/update-patient/update-patient.component";
import {LoginComponent} from "./components/login/login.component";
import {canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from "@angular/fire/auth-guard";

const redirectToLogin() = () => redirectUnauthorizedTo(['login']);
const redirectToHome() = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'cadastro',
        component: CadastroComponent,
        ...canActivate(redirectToLogin)
      },
      {
        path: 'home',
        component: HomeComponent,
        ...canActivate(redirectToLogin)
      },
      {
        path: 'patients',
        component: PatientsComponent,
        ...canActivate(redirectToLogin)
      },
      {
        path: 'system-unavailable',
        component: SystemUnavailableComponent,
        ...canActivate(redirectToLogin)
      },
      {
        path: 'update-patient',
        component: UpdatePatientComponent,
        ...canActivate(redirectToLogin)
      },
      {
        path: 'login',
        component: LoginComponent,
        ...canActivate(redirectToHome)
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
