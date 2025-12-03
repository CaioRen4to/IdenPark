import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  type: string;
  status: string;
  balance: number | null;
}

interface Vehicle {
  id: number;
  plate: string;
  model: string;
  color: string;
  userName: string;
  userType: string;
  status: string;
}

interface NavItem {
  label: string;
  view: string;
  icon: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  selectedView: string = 'dashboard';
  currentViewTitle: string = 'Painel Operacional';

  // --- Navegação ---
  navItems: NavItem[] = [
    { label: 'Dashboard', view: 'dashboard', icon: '🏠' },
    { label: 'Usuários', view: 'users', icon: '👥' },
    { label: 'Veículos', view: 'vehicles', icon: '🚗' },
    { label: 'Tarifas e Regras', view: 'tariffs', icon: '💰' },
    { label: 'Relatórios', view: 'reports', icon: '📈' },
    { label: 'Logs e Auditoria', view: 'logs', icon: '📜' },
    { label: 'Configurações', view: 'settings', icon: '⚙️' },
  ];

  // ---------------------- USERS ----------------------
  allUsers: User[] = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', type: 'FUNCIONARIO', status: 'ATIVO', balance: 150 },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', type: 'ALUNO', status: 'ATIVO', balance: 75.5 },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', type: 'FUNCIONARIO', status: 'ATIVO', balance: 200 },
    { id: 4, name: 'Ana Lima', email: 'ana@email.com', type: 'ALUNO', status: 'INATIVO', balance: 0 },
    { id: 5, name: 'Carlos Admin', email: 'carlos@email.com', type: 'ADMIN', status: 'ATIVO', balance: null },
    { id: 6, name: 'Operador 1', email: 'op1@email.com', type: 'OPERADOR', status: 'ATIVO', balance: null }
  ];

  filteredUsers: User[] = [];
  searchTerm: string = '';
  filterType: string = '';
  userFormVisible = false;
  userFormMode: 'create' | 'edit' | 'balance' = 'create';
  editingUser: User | null = null;
  userForm: Partial<User> = {};
  balanceAdjustment: { amount: number | null; reason: string } = { amount: null, reason: '' };

  // ---------------------- VEHICLES ----------------------
  allVehicles: Vehicle[] = [
    { id: 1, plate: 'ABC-1234', model: 'Honda Civic', color: 'Prata', userName: 'João Silva', userType: 'FUNCIONARIO', status: 'Ativo' },
    { id: 2, plate: 'XYZ-5678', model: 'Toyota Corolla', color: 'Branco', userName: 'Maria Santos', userType: 'ALUNO', status: 'Ativo' },
    { id: 3, plate: 'DEF-9012', model: 'VW Golf', color: 'Preto', userName: 'Pedro Costa', userType: 'FUNCIONARIO', status: 'Ativo' },
    { id: 4, plate: 'GHI-3456', model: 'Fiat Uno', color: 'Vermelho', userName: 'Ana Lima', userType: 'ALUNO', status: 'Inativo' }
  ];

  filteredVehicles: Vehicle[] = [];
  searchVehicleTerm: string = '';

  // ---------------------- DASHBOARD ----------------------
  cancelaStatus = [
    { name: 'Entrada Principal', type: 'ENTRADA', status: 'ONLINE' },
    { name: 'Saída Principal', type: 'SAÍDA', status: 'ONLINE' },
    { name: 'Entrada Lateral', type: 'ENTRADA', status: 'OFFLINE' }
  ];

  recentEvents = [
    { plate: 'ABC-1234', user: 'João Silva', type: 'ENTRADA', time: '14:32' },
    { plate: 'XYZ-5678', user: 'Maria Santos', type: 'SAÍDA', time: '14:28' },
    { plate: 'DEF-9012', user: 'Visitante', type: 'ENTRADA', time: '14:15' },
    { plate: 'GHI-3456', user: 'Operador', type: 'MANUAL', time: '14:10' }
  ];

  incidents = [
    { type: 'Perda de Ticket', location: 'Saída Principal', description: 'Veículo sem identificação na saída.' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.filteredUsers = [...this.allUsers];
    this.filteredVehicles = [...this.allVehicles];
    this.updateTitle(this.selectedView);
  }

  // ---------------------- VIEW SWITCH ----------------------
  selectView(view: string): void {
    this.selectedView = view;
    this.updateTitle(view);

    if (view === 'users') this.filterUsers();
    if (view === 'vehicles') this.filterVehicles();
  }

  updateTitle(view: string): void {
    const item = this.navItems.find(i => i.view === view);
    this.currentViewTitle = item ? item.label : 'IDENPARK Admin';
  }

  // ---------------------- USER FILTER ----------------------
  filterUsers(): void {
    let users = [...this.allUsers];

    const term = this.searchTerm.toLowerCase();
    if (this.searchTerm) {
      users = users.filter(u =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
      );
    }

    if (this.filterType) {
      users = users.filter(u => u.type === this.filterType);
    }

    this.filteredUsers = users;
  }

  // ---------------------- USER CRUD ----------------------
  openCreateUserForm(): void {
    this.userFormMode = 'create';
    this.editingUser = null;
    this.userForm = {
      name: '',
      email: '',
      type: 'FUNCIONARIO',
      status: 'ATIVO',
      balance: 0,
    };
    this.userFormVisible = true;
  }

  openEditUserForm(user: User): void {
    this.userFormMode = 'edit';
    this.editingUser = user;
    this.userForm = { ...user };
    this.userFormVisible = true;
  }

  openBalanceForm(user: User): void {
    this.userFormMode = 'balance';
    this.editingUser = user;
    this.balanceAdjustment = { amount: null, reason: '' };
    this.userFormVisible = true;
  }

  closeUserForm(): void {
    this.userFormVisible = false;
    this.editingUser = null;
    this.userForm = {};
    this.balanceAdjustment = { amount: null, reason: '' };
  }

  saveUser(): void {
    if (!this.userForm.name || !this.userForm.email || !this.userForm.type || !this.userForm.status) {
      alert('Preencha Nome, Email, Tipo e Status.');
      return;
    }

    if (this.userFormMode === 'create') {
      const nextId = this.allUsers.length
        ? Math.max(...this.allUsers.map(u => u.id)) + 1
        : 1;

      const newUser: User = {
        id: nextId,
        name: this.userForm.name as string,
        email: this.userForm.email as string,
        type: this.userForm.type as string,
        status: this.userForm.status as string,
        balance: (this.userForm.balance ?? 0) as number,
      };

      this.allUsers = [...this.allUsers, newUser];
    } else if (this.userFormMode === 'edit' && this.editingUser) {
      this.allUsers = this.allUsers.map(u =>
        u.id === this.editingUser!.id
          ? {
              ...u,
              name: this.userForm.name as string,
              email: this.userForm.email as string,
              type: this.userForm.type as string,
              status: this.userForm.status as string,
            }
          : u
      );
    }

    this.filterUsers();
    this.closeUserForm();
  }

  applyBalanceAdjustment(): void {
    if (!this.editingUser) {
      return;
    }

    const amount = Number(this.balanceAdjustment.amount ?? 0);
    const reason = (this.balanceAdjustment.reason || '').trim();

    if (!amount || !reason) {
      alert('Informe um valor diferente de zero e um motivo para o ajuste.');
      return;
    }

    const currentBalance = this.editingUser.balance ?? 0;

    this.allUsers = this.allUsers.map(u =>
      u.id === this.editingUser!.id
        ? {
            ...u,
            balance: currentBalance + amount,
          }
        : u
    );

    // Aqui poderíamos registrar o ajuste em um log/auditoria
    console.log('Ajuste de saldo aplicado:', {
      user: this.editingUser,
      amount,
      reason,
    });

    this.filterUsers();
    this.closeUserForm();
  }

  deleteUser(user: User): void {
    if (!confirm(`Tem certeza que deseja deletar o usuário ${user.name}?`)) return;

    this.allUsers = this.allUsers.filter(u => u.id !== user.id);
    this.filterUsers();
  }

  // ---------------------- VEHICLE FILTER ----------------------
  filterVehicles(): void {
    let vehicles = [...this.allVehicles];

    if (this.searchVehicleTerm) {
      const term = this.searchVehicleTerm.toLowerCase();
      vehicles = vehicles.filter(v =>
        v.plate.toLowerCase().includes(term) ||
        v.model.toLowerCase().includes(term) ||
        v.userName.toLowerCase().includes(term)
      );
    }

    this.filteredVehicles = vehicles;
  }

  editVehicle(vehicle: Vehicle): void {
    console.log('Editar veículo:', vehicle);
    alert(`Abrir modal de edição para o veículo ${vehicle.plate}`);
  }

  deleteVehicle(vehicle: Vehicle): void {
    if (!confirm(`Tem certeza que deseja deletar o veículo ${vehicle.plate}?`)) return;

    this.allVehicles = this.allVehicles.filter(v => v.id !== vehicle.id);
    this.filterVehicles();
  }

  logout(): void {
    console.log('Saindo do portal Admin.');
    alert('Sessão encerrada.');
  }
}
