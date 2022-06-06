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

  errosName: []; 
  errosLastName: []; 
  errosEmail: []; 
  errosBirthDate: []; 
  errosScholarity: [];

  constructor(private service: UserService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(p =>{
      this.service.getById(p["id"]).subscribe(data =>{
        this.user = data;})
    })
  }
  updateUser(formCadastro){

    this.mensagemProcessando = "Processando requisição, por favor aguarde...";
    this.mensagemSucesso = "";
    this.mensagemErro= "";
    this.errosName = [];
    this.errosLastName = [];
    this.errosEmail = [];
    this.errosBirthDate = [];
    this.errosScholarity = [];

    this.user = formCadastro.value;
    
    this.service.update(formCadastro.value)
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

}
