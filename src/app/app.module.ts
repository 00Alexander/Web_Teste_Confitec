import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { RouterModule, Routes } from '@angular/router';
import { CadastrarUsuarioComponent } from './views/cadastrar-usuario/cadastrar-usuario.component';
import { ConsultarUsuarioComponent } from './views/consultar-usuario/consultar-usuario.component';
import { HomeComponent } from './views/home/home.component';
import { AlterarUsuarioComponent } from './views/alterar-usuario/alterar-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastrarUsuarioComponent,
    ConsultarUsuarioComponent,
    HomeComponent,
    AlterarUsuarioComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
