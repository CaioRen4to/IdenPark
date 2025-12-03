import { Routes } from '@angular/router';

export const routes: Routes = [

<<<<<<< HEAD
  { 
    path: 'login', 
    loadComponent: () => import('./pages/validacao/login/login').then(m => m.Login) 
=======
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
>>>>>>> 641ad4d23de2ccefc56330df82c7a65d3d46b63a
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/validacao/login/login')
      .then(m => m.Login)
  },

  {
    path: 'cadastro',
    loadComponent: () =>
      import('./pages/validacao/cadastro/cadastro')
      .then(m => m.Cadastro)
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin')
      .then(m => m.Admin)
  },

  {
    path: 'funcionario',
    loadComponent: () =>
      import('./pages/funcionario/funcionario')
      .then(m => m.Funcionario)
  },

  {
<<<<<<< HEAD
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

  // ✅ MUDANÇA AQUI: Redireciona para funcionario em vez de login
  { 
    path: '', 
    redirectTo: '/funcionario',  // ← AQUI!
    pathMatch: 'full' 
  },
];
=======
    path: 'carteira',
    loadComponent: () =>
      import('./pages/carteira/carteira')
      .then(m => m.Carteira)
  },
  {
    path: 'recarga',
    loadComponent: () =>
      import('./pages/recarga/recarga.component')
      .then(m => m.RecargaComponent)
  },
  {
    path: 'alunos',
    loadComponent: () =>
      import('./pages/alunos/alunos')
      .then(m => m.Alunos)
  },
  {
    path: 'historico',
    loadComponent: () =>
      import('./pages/historico/historico')
      .then(m => m.Historico)
  },
  {
    path: 'dados',
    loadComponent: () =>
      import('./pages/dados/dados')
      .then(m => m.Dados)
  },
  {
    path: 'veiculos',
    loadComponent: () =>
      import('./pages/veiculos/veiculos')
      .then(m => m.Veiculos)
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];
>>>>>>> 641ad4d23de2ccefc56330df82c7a65d3d46b63a
