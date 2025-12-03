import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './historico.html',
  styleUrls: ['./historico.css'],
})
export class Historico {
  user: WalletUser | null = null;
  transacoes: WalletTransaction[] = [];
  filtroTipo: 'TODOS' | 'CREDITO' | 'DEBITO' | 'AJUSTE' = 'TODOS';

  ngOnInit() {
    this.carregarUsuario();
  }

  get transacoesFiltradas(): WalletTransaction[] {
    if (this.filtroTipo === 'TODOS') {
      return this.transacoes;
    }
    return this.transacoes.filter(t => t.type === this.filtroTipo);
  }

  private carregarUsuario() {
    const raw = localStorage.getItem('logadoUser');
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw) as WalletUser;
    this.user = parsed;
    this.transacoes = (parsed.transacoes ?? []).slice().sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
  }

  exportarCSV() {
    if (!this.transacoesFiltradas.length) {
      alert('Nenhuma transação para exportar.');
      return;
    }

    const header = 'Data;Tipo;Valor;Descrição;Método';
    const linhas = this.transacoesFiltradas.map(t => {
      const data = new Date(t.createdAt).toLocaleString('pt-BR');
      const valor = t.amount.toFixed(2).replace('.', ',');
      return `${data};${t.type};${valor};${t.description};${t.method ?? ''}`;
    });

    const conteudo = [header, ...linhas].join('\n');
    const blob = new Blob([conteudo], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'extrato_idenpark.csv';
    link.click();

    URL.revokeObjectURL(url);
  }
}


