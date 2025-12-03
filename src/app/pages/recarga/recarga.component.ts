import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recarga',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './recarga.component.html',
  styleUrls: ['./recarga.component.css']
})
export class RecargaComponent implements OnInit {

  currentBalance: number = 100.00;
  rechargeValue: number | null = null;
  quickValues: number[] = [20, 50, 100, 200];
  selectedMethod: string | null = null;
  totalToPay: number = 0;

  ngOnInit(): void {
    this.updateTotal();
  }

  goBack(): void {
    // Volta para a tela anterior (onde o usuário estava antes de abrir recarga)
    window.history.back();
  }

  setRechargeValue(value: number): void {
    this.rechargeValue = value;
    this.updateTotal();
  }

  updateTotal(): void {
    const value = Number(this.rechargeValue) || 0;
    this.totalToPay = Math.max(0, value);
  }

  selectMethod(method: string): void {
    this.selectedMethod = method;
  }

  isValidPayment(): boolean {
    return this.totalToPay > 0 && this.selectedMethod !== null;
  }

  confirmRecharge(): void {
    if (!this.isValidPayment()) {
      alert('Selecione um valor e um método de pagamento.');
      return;
    }

    console.log(
      `Confirmando recarga de R$ ${this.totalToPay.toFixed(2)} usando ${this.selectedMethod}.`
    );

    // Atualiza carteira e extrato do usuário logado
    const raw = localStorage.getItem('logadoUser');
    if (raw) {
      const user = JSON.parse(raw) as any;
      const valor = this.totalToPay;

      user.saldo = (user.saldo ?? 0) + valor;
      user.transacoes = user.transacoes ?? [];
      user.transacoes.unshift({
        id: Date.now(),
        type: 'CREDITO',
        amount: valor,
        description: 'Recarga de saldo',
        method: this.selectedMethod,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem('logadoUser', JSON.stringify(user));

      const usersRaw = localStorage.getItem('users');
      if (usersRaw) {
        const users = JSON.parse(usersRaw) as any[];
        const idx = users.findIndex(u => u.email === user.email);
        if (idx >= 0) {
          users[idx] = user;
          localStorage.setItem('users', JSON.stringify(users));
        }
      }

      this.currentBalance = user.saldo;

      alert(
        `Pagamento simulado! Recarga de R$ ${this.totalToPay.toFixed(
          2
        )} com ${this.selectedMethod} processada. Saldo final: R$ ${user.saldo.toFixed(2)}.`
      );
    } else {
      alert(
        `Pagamento simulado! Recarga de R$ ${this.totalToPay.toFixed(
          2
        )} com ${this.selectedMethod} processada.`
      );
    }
  }
}
