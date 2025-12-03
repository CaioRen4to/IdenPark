import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar implements OnInit {
  role: 'administrador' | 'funcionario' | 'aluno' | 'outro' = 'outro';
  nome: string = ''; // Aqui vamos guardar o nome do usuário

  constructor(private router: Router) {}

  ngOnInit() {
    const raw = localStorage.getItem('logadoUser');
    if (!raw) {
      return;
    }

    try {
      const user = JSON.parse(raw) as { permissao?: string; nome?: string };
      const p = (user.permissao || '').toLowerCase();
      this.nome = user.nome || '';
      
      if (p === 'administrador' || p === 'funcionario' || p === 'aluno') {
        this.role = p;
      } else {
        this.role = 'outro';
      }
    } catch {
      this.role = 'outro';
      this.nome = '';
    }
  }

  goHome() {
    const raw = localStorage.getItem('logadoUser');
    if (!raw) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      const user = JSON.parse(raw) as { permissao?: string };
      const role = (user.permissao || '').toLowerCase();

      if (role === 'administrador') {
        this.router.navigate(['/admin']);
        return;
      }

      if (role === 'funcionario') {
        this.router.navigate(['/funcionario']);
        return;
      }

      if (role === 'aluno') {
        this.router.navigate(['/alunos']);
        return;
      }

      this.router.navigate(['/login']);
    } catch {
      this.router.navigate(['/login']);
    }
  }
}
