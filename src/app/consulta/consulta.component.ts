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

/*
OnInit -> Interface que faz parte do ciclo de vida dos componentes.
Implementa um método chamado ngOnInit(). Quando um componente implementa esta 
interface, ele deve conter esse método, que será executado em um momento 
específico do ciclo de vida do componente.
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

  public listaClientes: Cliente[] = [];
  public colunasTabela: string[] = ["id", "nome", "email", "cpf", "dataNascimento"];

  public constructor(private clienteService: ClienteService) { }

  public ngOnInit(): void {
    this.listaClientes = this.clienteService.pesquisarCliente();
  }
}
