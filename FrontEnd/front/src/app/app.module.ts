import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioLsComponent } from './pages/usuario-ls/usuario-ls.component';
import { ActividadLsComponent } from './pages/actividad-ls/actividad-ls.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { SoloTextoDirective } from './directives/solo-texto.directive';
import { SoloNumerosDirective } from './directives/solo-numeros.directive';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioLsComponent,
    ActividadLsComponent,
    SoloTextoDirective,
    SoloNumerosDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
