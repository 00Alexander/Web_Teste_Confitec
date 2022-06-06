import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-consultar-usuario',
  templateUrl: './consultar-usuario.component.html',
  styleUrls: ['./consultar-usuario.component.css']
})
export class ConsultarUsuarioComponent implements OnInit {
  userList = [];
  count: number;
  mensagemSucesso:string;
  mensagemErro:string;

  constructor(
    private service: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void{
    this.service.getAll()
      .subscribe(
        (success: any[]) =>{
          this.userList = success;
          console.log(this.userList)
          this.count = this.userList.length;
        },
        e => { console.log(e)
        })
    console.log(this.count)
  }

  changePage(id): void{
    this.router.navigateByUrl(`alterar-usuario/${id}`)
  }

  deleteUser(id): void{
    this.service.delete(id).subscribe(
      success => {
        this.mensagemSucesso = success;
        this.getUserList();
      }, 
      e => {
       switch(e.status){
        case 400: 
          this.mensagemErro = "Não foi possivel deletar o cadastro";
          break;

        case 403: 
        this.mensagemErro = e.error;
          break;

        default:
          this.mensagemErro = "Não foi possivel deletar o cadastro";
          break;
        }
      });
    
  }

  limparMensagemSucesso(){
    this.mensagemSucesso ="";
  }
  limparMensagemErro(){
    this.mensagemErro ="";
  }

}
