import { routes } from './../app.routes';
import { Component, isStandalone, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService }from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/*
OnInit -> Interface que faz parte do ciclo de vida dos componentes.
  Implementa um método chamado ngOnInit(). Quando um componente implementa esta 
  interface, ele deve conter esse método, que será executado em um momento 
  específico do ciclo de vida do componente.
___________

-> Navegar de uma página para outra, passando parâmetros.
Sempre que for necessário fazer navegação dentro dos componentes, injetar
o Router: 
  Contexto: Quando o usuário clicar no botão de "Editar" vai acionar 
  o método "preparaEditar" e vai executar o algoritmo do método:
  this.router.navigate(['/cadastro'], {queryParams: {"id": id}});
  aonde o método "navigate" do router recebe dois parâmetros,
  um array onde é passado o nome da rota para onde ele deve ir 
  e o segundo são os parâmetros que devem ser passados de página 
  para página.
___________
*/

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule, 
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {

  public nomeBusca: string = '';
  public listaClientes: Cliente[] = [];
  public colunasTabela: string[] = ["id", "nome", "email", "cpf", "dataNascimento", "acoes"];
  
  public constructor(
    private service: ClienteService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.listaClientes = this.service.buscarTodosClientes();
  }

  public pesquisarPorNome(): void {
    this.listaClientes = this.service.pesquisarClientePeloNome(this.nomeBusca);
  }

  public preparaEditar(id: string): void {
    this.router.navigate([ '/cadastro' ], {queryParams: { "id": id }});
  }

  public preparaDeletar(cliente: Cliente): void {
    cliente.deletando = true;
  }

  public deletar(cliente: Cliente): void {
    this.service.deletarCliente(cliente);
    this.listaClientes = this.service.buscarTodosClientes();
  }
}
