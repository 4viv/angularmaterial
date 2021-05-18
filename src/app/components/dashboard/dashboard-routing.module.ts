import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoUsuarioComponent } from './users/nuevo-usuario/nuevo-usuario.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', redirectTo: 'usuarios', component: InicioComponent },
    { path: 'usuarios', component: UsersComponent },
    { path: 'reportes', component: ReportsComponent },
    { path: 'nuevo-usuario', component: NuevoUsuarioComponent },
    { path: 'editar-usuario/:id', component: NuevoUsuarioComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
