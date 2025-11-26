import { Component } from '@angular/core';
import { DecimalPipe, TitleCasePipe, NgClass, NgFor, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-carteira',
  standalone: true,
  imports: [DecimalPipe, TitleCasePipe, NgClass, NgFor, FormsModule],
  templateUrl: './dashboard-carteira.html',
  styleUrl: './dashboard-carteira.css'
})
export class DashboardCarteira {

  totalCarteiras = 15750;
  recargasHoje = 1250;
  debitosHoje = 890;

  transacoes = [
    { tipo: 'credito', usuario: 'João Silva', descricao: 'Recarga PIX', data: '26/11/2025 10:30', valor: 100 },
    { tipo: 'debito',  usuario: 'João Silva', descricao: 'Estadia #1234', data: '26/11/2025 12:45', valor: -15 },
    { tipo: 'credito', usuario: 'Maria Santos', descricao: 'Recarga Cartão', data: '26/11/2025 09:00', valor: 50 },
    { tipo: 'estorno', usuario: 'Pedro Costa', descricao: 'Estorno estadia #1200', data: '25/11/2025 16:20', valor: 10 },
    { tipo: 'debito',  usuario: 'Maria Santos', descricao: 'Estadia #1235', data: '26/11/2025 14:00', valor: -22.5 },
  ];

  novaRecarga() {
  console.log('Abrir modal de nova recarga...');
  
}; busca: string = '';



}
