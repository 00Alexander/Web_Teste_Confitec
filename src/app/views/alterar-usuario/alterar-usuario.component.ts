import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-alterar-usuario',
  templateUrl: './alterar-usuario.component.html',
  styleUrls: ['./alterar-usuario.component.css']
})
export class AlterarUsuarioComponent implements OnInit {

  user: User;
  

  mensagemProcessando:string;
  mensagemSucesso:string;
  mensagemErro:string;

  constructor(private service: UserService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(p =>{
      this.service.getById(p["id"]).subscribe(data =>{
        this.user = data;})
    })
  }
  updateUser(): void{

    this.mensagemProcessando = "Processando requisição, por favor aguarde...";
    this.mensagemSucesso = "";
    this.mensagemErro= "";
    
    this.service.update(this.user)
      .subscribe(
        success => {
          this.mensagemProcessando = "";
          this.mensagemSucesso = success;  
          this.router.navigateByUrl('consultar-usuario');
        },
        e => {
          this.mensagemProcessando = "";
        
         switch(e.status){
          case 400: 
            this.mensagemErro = "Ocorreram erros de validação no formulario";

          case 403: 
          this.mensagemErro = e.error;
            break;
          
          case 500: 
            this.mensagemErro = e.error;
          break;

          default:
            this.mensagemErro = "Erro ao cadastrar usuario";
            break;
          }
        }
      );

  }

  limparMensagemSucesso(){
    this.mensagemSucesso ="";
  }
  limparMensagemErro(){
    this.mensagemErro ="";
  }

}
