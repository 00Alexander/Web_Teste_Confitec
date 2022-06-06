import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  user: User;

  mensagemProcessando:string;
  mensagemSucesso:string;
  mensagemErro:string;

  errosName: []; 
  errosLastName: []; 
  errosEmail: []; 
  errosBirthDate: []; 
  errosScholarity: []; 

  constructor( private service: UserService) { }

  ngOnInit(): void {
  }

  cadastrarUsuario(formCadastro){

    this.mensagemProcessando = "Processando requisição, por favor aguarde...";
    this.mensagemSucesso = "";
    this.mensagemErro= "";
    this.errosName = [];
    this.errosLastName = [];
    this.errosEmail = [];
    this.errosBirthDate = [];
    this.errosScholarity = [];

    this.user = formCadastro.value;
    
    this.service.register(formCadastro.value)
      .subscribe(
        success => {
          this.mensagemProcessando = "";
          this.mensagemSucesso = success;  
          formCadastro.reset();
        },
        e => {
          this.mensagemProcessando = "";
        
         switch(e.status){
          case 400: 
            this.mensagemErro = "Ocorreram erros de validação no formulario";

            var validations = JSON.parse(e.error);

            this.errosName = validations.errors.Name;
            this.errosLastName = validations.errors.LastName;
            this.errosEmail = validations.errors.Email;
            this.errosBirthDate = validations.errors.BirthDate;
            this.errosScholarity = validations.errors.Scholarity;

            break;

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
