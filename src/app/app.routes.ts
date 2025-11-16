import { Routes } from '@angular/router';
import { Login } from './pages/validacao/login/login';
import { Cadastro } from './pages/validacao/cadastro/cadastro';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'cadastro',
        component: Cadastro
    }
];
