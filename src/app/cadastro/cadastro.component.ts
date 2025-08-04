import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule }from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    MatButtonModule
],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  public cliente: Cliente = Cliente.newCliente();
  public atualizando: boolean = false;
  
  public constructor(
    private service: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public salvarCliente(): void {
    if(!this.atualizando) {
      this.service.salvarCliente(this.cliente);
      this.cliente = Cliente.newCliente();
    } else {
      this.atualizarCliente();
      this.router.navigate([ '/consulta' ]);
    }
  }

  public atualizarCliente(): void {
    this.service.atualizarCliente(this.cliente);
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
        }
      }
    });
  }
}
