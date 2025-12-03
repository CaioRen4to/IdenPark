import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../ComponentsCompartilhados/sidebar/sidebar';

interface ProfileUser {
  nome: string;
  email: string;
  senha?: string;
  password?: string;
  permissao: string;
}

@Component({
  selector: 'app-dados',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './dados.html',
  styleUrls: ['./dados.css'],
})
export class Dados {
  user: ProfileUser | null = null;

  nome = '';
  email = '';
  senhaAtual = '';
  novaSenha = '';

  ngOnInit() {
    this.carregarUsuario();
  }

  private carregarUsuario() {
    const raw = localStorage.getItem('logadoUser');
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw) as ProfileUser;
    this.user = parsed;
    this.nome = parsed.nome;
    this.email = parsed.email;
  }

  private salvarUsuario() {
    if (!this.user) {
      return;
    }

    this.user.nome = this.nome;
    this.user.email = this.email;

    if (this.novaSenha) {
      this.user.password = this.novaSenha;
    }

    localStorage.setItem('logadoUser', JSON.stringify(this.user));

    const usersRaw = localStorage.getItem('users');
    if (usersRaw) {
      const users = JSON.parse(usersRaw) as ProfileUser[];
      const idx = users.findIndex(u => u.email === this.email || u.email === this.user!.email);
      if (idx >= 0) {
        users[idx] = this.user!;
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  }

  salvar() {
    if (!this.user) {
      return;
    }

    if (!this.nome || !this.email) {
      alert('Preencha Nome e Email.');
      return;
    }

    if (this.novaSenha) {
      const senhaAtualStorage = this.user.password ?? this.user.senha ?? '';
      if (!this.senhaAtual || this.senhaAtual !== senhaAtualStorage) {
        alert('Senha atual incorreta.');
        return;
      }
    }

    this.salvarUsuario();
    alert('Dados atualizados com sucesso!');
    this.senhaAtual = '';
    this.novaSenha = '';
  }
}


