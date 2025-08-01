import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConsultaComponent } from './consulta/consulta.component';
/*
-> Aonde eu coloco as rotas da aplicação
*/
export const routes: Routes = [
    { path:'cadastro', component: CadastroComponent },
    { path:'consulta', component: ConsultaComponent}
];
