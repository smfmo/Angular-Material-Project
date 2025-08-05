import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from './endereco.model';

@Injectable({
  providedIn: 'root'
})
export class ViacepApiService {

  private pathBeforeParam: string = "https://viacep.com.br/ws/";
  private pathAfterParam: string = "/json/";

  public constructor(
    private http: HttpClient
  ) { }

  public buscarCep(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(this.pathBeforeParam + cep + this.pathAfterParam);
  }

}
