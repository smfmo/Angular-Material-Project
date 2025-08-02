import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente'; 

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public static REPO_CLIENTES = "_CLIENTES";

  public constructor() { }

  public obterStorage(): Cliente[] {
    const repositorioClientesSalvos = localStorage.getItem(StorageService.REPO_CLIENTES);

    if(repositorioClientesSalvos) {
      const clientes: Cliente[] = JSON.parse(repositorioClientesSalvos);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(StorageService.REPO_CLIENTES, JSON.stringify(clientes));

    return clientes; 
  }
  
}
