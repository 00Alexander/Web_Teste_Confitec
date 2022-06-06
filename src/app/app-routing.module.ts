import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlterarUsuarioComponent } from './views/alterar-usuario/alterar-usuario.component';

import { CadastrarUsuarioComponent } from './views/cadastrar-usuario/cadastrar-usuario.component';
import { ConsultarUsuarioComponent } from './views/consultar-usuario/consultar-usuario.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastrar-usuario', component: CadastrarUsuarioComponent },
  { path: 'consultar-usuario', component: ConsultarUsuarioComponent },
  { path: 'alterar-usuario/:id', component: AlterarUsuarioComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
