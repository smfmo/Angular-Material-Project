import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';
import { StorageService } from './storage.service';
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

  constructor(private storage: StorageService) { }

  salvarCliente(cliente: Cliente) {
    const storage = this.storage.obterStorage();
    storage.push(cliente);

    localStorage.setItem(StorageService.REPO_CLIENTES, JSON.stringify(storage));
  }
}
