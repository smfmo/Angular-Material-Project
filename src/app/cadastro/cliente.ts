import { v4 as uuid } from 'uuid';

export class Cliente {
    id?: string;
    nome?: string;
    cpf?: string;
    dataNascimento?: string;
    email?: string;
    deletando: boolean = false;
    uf?: string;
    municipio?: string;

    public static newCliente(): Cliente { 
        const cliente = new Cliente();
        cliente.id = uuid();
        return cliente;
    }
}