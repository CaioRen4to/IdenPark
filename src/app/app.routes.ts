import { Routes } from '@angular/router';

export const routes: Routes = [

  { 
    path: 'login', 
    loadComponent: () => import('./pages/validacao/login/login').then(m => m.Login) 
  },

  { 
    path: 'cadastro', 
    loadComponent: () => import('./pages/validacao/cadastro/cadastro').then(m => m.Cadastro) 
  },

  { 
    path: 'admin', 
    loadComponent: () => import('./pages/admin/admin').then(m => m.Admin) 
  },

  { 
    path: 'funcionario', 
    loadComponent: () => import('./pages/funcionario/funcionario').then(m => m.Funcionario) 
  },

  { 
    path: 'alunos', 
    loadComponent: () => import('./pages/alunos/alunos').then(m => m.Alunos) 
  },
  { 
    path: '', redirectTo: '/login', pathMatch: 'full' 
  },
];
