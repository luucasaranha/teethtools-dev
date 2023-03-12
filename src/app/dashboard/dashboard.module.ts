import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WrapperComponent} from './components/wrapper/wrapper.component';
import {CadastroComponent} from './components/cadastro/cadastro.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {HomeComponent} from './components/home/home.component';
import {PatientsComponent} from './components/patients/patients.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from "@angular/material/menu";
import {UpdatePatientComponent} from './components/update-patient/update-patient.component';
import {LoginComponent} from './components/login/login.component';
import {NgxMaskModule} from "ngx-mask";
import {MatExpansionModule} from "@angular/material/expansion";
import {LoadingComponent} from './components/loading/loading.component';
import {PatientsMetricsComponent} from "./components/patients-metrics/patients-metrics.component";

@NgModule({
    declarations: [
        WrapperComponent,
        CadastroComponent,
        HomeComponent,
        PatientsComponent,
        UpdatePatientComponent,
        LoginComponent,
        LoadingComponent,
        PatientsMetricsComponent
    ],
    exports: [
        LoadingComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        HttpClientModule,

        // Material
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatTableModule,
        MatCardModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatSortModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatMenuModule,
        FormsModule,
        NgxMaskModule,
        MatExpansionModule
    ]
})
export class DashboardModule {}
