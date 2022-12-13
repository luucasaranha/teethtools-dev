import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WrapperComponent} from './components/wrapper/wrapper.component';
import {CadastroComponent} from './components/cadastro/cadastro.component';
import {HomeComponent} from './components/home/home.component';
import {PatientsComponent} from './components/patients/patients.component';
import {SystemUnavailableComponent} from "../system-unavailable/system-unavailable.component";
import {UpdatePatientComponent} from "./components/update-patient/update-patient.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'cadastro',
        component: CadastroComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'patients',
        component: PatientsComponent,
      },
      {
        path: 'system-unavailable',
        component: SystemUnavailableComponent
      },
      {
        path: 'update-patient',
        component: UpdatePatientComponent
      },
      {
        path: 'login',
        component: LoginComponent
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
