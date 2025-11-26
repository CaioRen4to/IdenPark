import { Component, ChangeDetectionStrategy, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from "../../ComponentsCompartilhados/sidebar/sidebar";

// Interfaces
interface StatCard {
  value: string;
  label: string;
  icon: string;
  color: string;
}

interface User {
  id: number;
  nome: string;
  email: string;
  tipo: 'FUNCIONARIO' | 'ALUNO' | 'ADMIN' | 'OPERADOR';
  status: 'ATIVO' | 'INATIVO';
  saldo: string;
}

interface Vehicle {
  id: number;
  placa: string;
  modelo: string;
  cor: string;
  usuario: string;
  tipo: 'FUNCIONARIO' | 'ALUNO';
  status: 'Ativo' | 'Inativo';
}

interface RecentEvent {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  type: 'ENTRADA' | 'SAIDA' | 'MANUAL';
  color: string;
  icon: string;
}

interface GateStatus {
  name: string;
  detail: string;
  status: 'ONLINE' | 'OFFLINE';
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Admin implements OnInit {

  // ==================== SINAIS ====================
  public activePage = signal<'dashboard' | 'usuarios' | 'veiculos'>('dashboard');

  public pageTitles: { [key: string]: string } = {
    'dashboard': 'Painel Operacional',
    'usuarios': 'Usuários',
    'veiculos': 'Veículos',
  };

  public statCards = signal<StatCard[]>([
    { value: '47', label: 'Veículos Dentro', icon: '🚚', color: '#4a90e2' },
    { value: '153', label: 'Vagas Livres', icon: '✅', color: '#50e3c2' },
    { value: 'R$ 1.250', label: 'Receita Hoje', icon: '🟨', color: '#f8e71c' },
    { value: '2h 15m', label: 'Tempo Médio', icon: '⏰', color: '#9013fe' },
  ]);

  public gatesStatus = signal<GateStatus[]>([
    { name: 'Entrada Principal', detail: 'ENTRADA', status: 'ONLINE' },
    { name: 'Saída Principal', detail: 'SAÍDA', status: 'ONLINE' },
    { name: 'Entrada Lateral', detail: 'ENTRADA', status: 'OFFLINE' },
  ]);

  public recentEvents = signal<RecentEvent[]>([
    { id: 1, title: 'ABC-1234', subtitle: 'João Silva', time: '14:32', type: 'ENTRADA', color: '#50e3c2', icon: '➡️' },
    { id: 2, title: 'XYZ-5678', subtitle: 'Maria Santos', time: '14:28', type: 'SAIDA', color: '#d0021b', icon: '⬅️' },
    { id: 3, title: 'DEF-9012', subtitle: 'Visitante', time: '14:15', type: 'ENTRADA', color: '#50e3c2', icon: '➡️' },
    { id: 4, title: 'GHI-3456', subtitle: 'Operador', time: '14:10', type: 'MANUAL', color: '#f5a623', icon: '⚠️' },
  ]);

  public usersList = signal<User[]>([
    { id: 1, nome: 'João Silva', email: 'joao@email.com', tipo: 'FUNCIONARIO', status: 'ATIVO', saldo: 'R$ 150.00' },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', tipo: 'ALUNO', status: 'ATIVO', saldo: 'R$ 75.50' },
    { id: 3, nome: 'Pedro Costa', email: 'pedro@email.com', tipo: 'FUNCIONARIO', status: 'ATIVO', saldo: 'R$ 200.00' },
    { id: 4, nome: 'Ana Lima', email: 'ana@email.com', tipo: 'ALUNO', status: 'INATIVO', saldo: 'R$ 0.00' },
    { id: 5, nome: 'Carlos Admin', email: 'carlos@email.com', tipo: 'ADMIN', status: 'ATIVO', saldo: '-' },
    { id: 6, nome: 'Operador 1', email: 'op1@email.com', tipo: 'OPERADOR', status: 'ATIVO', saldo: '-' },
  ]);

  public vehiclesList = signal<Vehicle[]>([
    { id: 1, placa: 'ABC-1234', modelo: 'Honda Civic', cor: 'Prata', usuario: 'João Silva', tipo: 'FUNCIONARIO', status: 'Ativo' },
    { id: 2, placa: 'XYZ-5678', modelo: 'Toyota Corolla', cor: 'Branco', usuario: 'Maria Santos', tipo: 'ALUNO', status: 'Ativo' },
    { id: 3, placa: 'DEF-9012', modelo: 'VW Golf', cor: 'Preto', usuario: 'Pedro Costa', tipo: 'FUNCIONARIO', status: 'Ativo' },
    { id: 4, placa: 'GHI-3456', modelo: 'Fiat Uno', cor: 'Vermelho', usuario: 'Ana Lima', tipo: 'ALUNO', status: 'Inativo' },
  ]);

  // ==================== COMPUTED ====================
  currentPageTitle = computed(() => this.pageTitles[this.activePage()]);

  constructor() {}

  ngOnInit(): void {}

  // ==================== FUNÇÕES ====================
  showPage(page: 'dashboard' | 'usuarios' | 'veiculos') {
    this.activePage.set(page);
  }
}
