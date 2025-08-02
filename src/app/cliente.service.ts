import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';
/*
Decorator -> @Injectable({})
O angular contém um container de injeção de dependências, ou seja,
existe um repositório onde o Angular salva todas as classes que podem
ser injetados (semelhante ao SpringBoot). E ele injeta aonde for necessário 
dentro da aplicação.

-> providedIn: 'root' : Significa que o service está no root da aplicação
e é possível ser injetado em qualquer local da aplicação.

*/
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }

  obterStorage() : Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);

    if(repositorioClientes) {
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));

    return clientes;
  }

  salvarCliente(cliente: Cliente) {
    console.log(cliente);
  }

}
