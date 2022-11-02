import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadLsComponent } from './pages/actividad-ls/actividad-ls.component';
import { UsuarioLsComponent } from './pages/usuario-ls/usuario-ls.component';

const routes: Routes = [
  {
    path: "usuarios",
    component: UsuarioLsComponent
  },
  {
    path:"actividades",
    component:ActividadLsComponent
  },
  {
    pathMatch:"full", path:'', redirectTo:"usuarios"
  },
  {
    pathMatch:"full", path:'**', redirectTo:"usuarios"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
