import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule }from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BrasilapiService } from '../brasilapi.service';
import { ViacepApiService } from './../viacep-api.service';
import { Estado, Municipio } from '../brasilapi.model';
import { Endereco } from '../endereco.model';


/*
-> ActivatedRoute -> Aqui esta injetando os dados da rota que foi
ativada. 
O router serve para navegar e o ActivatedRoute serve para capturar 
os dados da rota que foi acessada.
*/

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    NgxMaskDirective
],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  public cliente: Cliente = Cliente.newCliente();
  public atualizando: boolean = false;
  private snack: MatSnackBar = inject(MatSnackBar);
  public estados: Estado[] = [];
  public municipios: Municipio[] = [];
  public endereco: Endereco = new Object;
  public cep: string = '';
  
  public constructor(
    private service: ClienteService,
    private brasilapiService: BrasilapiService,
    private viacepApiService: ViacepApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  public salvarCliente(): void {
    if(!this.atualizando) {
      this.service.salvarCliente(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem("Salvo com Sucesso!");
    } else {
      this.atualizarCliente();
      this.router.navigate([ '/consulta' ]);
      this.mostrarMensagem("Atualizado com sucesso!");
    }
  }

  public atualizarCliente(): void {
    this.service.atualizarCliente(this.cliente);
  }

  public carregarUfs(): void {
    this.brasilapiService.listarUfs().subscribe({
      next: listaEstados => this.estados = listaEstados,
      error: erro => console.log("ocorreu um erro inesperado:", erro)
    });
  }

  public carregarMunicipios(event: MatSelectChange): void {
    const ufSelecionada = event.value;
    this.brasilapiService.listarMunicipios(ufSelecionada).subscribe({
      next: listaMunicipios => this.municipios = listaMunicipios,
      error: erro => console.log("Ocorreu um erro inesperado:", erro)
    });
  }

  public buscarCep(): void {
    this.viacepApiService.buscarCep(this.cep).subscribe({
      next: (enderecoLocalizado) => {
        this.endereco = enderecoLocalizado;
      },
      error: erro => console.log("Ocorreu um erro inesperado", erro)
    });
  }
 
  public mostrarMensagem(mensagem: string): void {
    this.snack.open(mensagem, "Ok");
  }
 
  public ngOnInit(): void {
    this.route.queryParamMap.subscribe( (query: any) => {
      const params = query[ 'params' ];
      const id = params[ 'id' ];
      if(id) {
        let clienteEncontrado = this.service.buscarClientePorId(id);
        if(clienteEncontrado) {
          this.atualizando = true;
          this.cliente = clienteEncontrado;
          if(this.cliente.uf) {
            const event = { value: this.cliente.uf}
            this.carregarMunicipios(event as MatSelectChange);
          }
        }
      }
    });

    this.carregarUfs();
  }
}
