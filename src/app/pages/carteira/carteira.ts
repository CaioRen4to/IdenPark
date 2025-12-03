import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../../ComponentsCompartilhados/sidebar/sidebar';

interface WalletTransaction {
  id: number;
  type: 'CREDITO' | 'DEBITO' | 'AJUSTE';
  amount: number;
  description: string;
  method?: string;
  createdAt: string;
}

interface WalletUser {
  nome: string;
  email: string;
  permissao: string;
  saldo?: number;
  transacoes?: WalletTransaction[];
}

@Component({
  selector: 'app-carteira',
  standalone: true,
  imports: [CommonModule, RouterLink, Sidebar],
  templateUrl: './carteira.html',
  styleUrls: ['./carteira.css'],
})
export class Carteira {
  user: WalletUser | null = null;
  saldoAtual = 0;

  ngOnInit() {
    this.carregarUsuario();
  }

  private carregarUsuario() {
    const raw = localStorage.getItem('logadoUser');
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw) as WalletUser;
    if (parsed.saldo == null) {
      parsed.saldo = 0;
    }

    if (!parsed.transacoes) {
      parsed.transacoes = [];
    }

    this.user = parsed;
    this.saldoAtual = parsed.saldo ?? 0;
  }
}


