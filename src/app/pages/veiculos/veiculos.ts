import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../ComponentsCompartilhados/sidebar/sidebar';

interface UserVehicle {
  id: number;
  placa: string;
  modelo: string;
  cor: string;
  ativo: boolean;
}

interface UserWithVehicles {
  nome: string;
  email: string;
  permissao: string;
  veiculos?: UserVehicle[];
}

@Component({
  selector: 'app-veiculos',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './veiculos.html',
  styleUrls: ['./veiculos.css'],
})
export class Veiculos {
  user: UserWithVehicles | null = null;
  veiculos: UserVehicle[] = [];

  formVisible = false;
  editando: UserVehicle | null = null;
  form: Partial<UserVehicle> = {};

  ngOnInit() {
    this.carregarUsuario();
  }

  private carregarUsuario() {
    const raw = localStorage.getItem('logadoUser');
    if (!raw) {
      return;
    }

    const parsed = JSON.parse(raw) as UserWithVehicles;
    if (!parsed.veiculos) {
      parsed.veiculos = [];
    }

    this.user = parsed;
    this.veiculos = [...parsed.veiculos];
  }

  private salvarUsuario() {
    if (!this.user) {
      return;
    }

    this.user.veiculos = [...this.veiculos];
    localStorage.setItem('logadoUser', JSON.stringify(this.user));

    const usersRaw = localStorage.getItem('users');
    if (usersRaw) {
      const users = JSON.parse(usersRaw) as UserWithVehicles[];
      const idx = users.findIndex(u => u.email === this.user!.email);
      if (idx >= 0) {
        users[idx] = this.user!;
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  }

  abrirNovo() {
    this.editando = null;
    this.form = {
      placa: '',
      modelo: '',
      cor: '',
      ativo: true,
    };
    this.formVisible = true;
  }

  editar(veiculo: UserVehicle) {
    this.editando = veiculo;
    this.form = { ...veiculo };
    this.formVisible = true;
  }

  excluir(veiculo: UserVehicle) {
    if (!confirm(`Remover o veículo ${veiculo.placa}?`)) {
      return;
    }

    this.veiculos = this.veiculos.filter(v => v.id !== veiculo.id);
    this.salvarUsuario();
  }

  cancelar() {
    this.formVisible = false;
    this.editando = null;
    this.form = {};
  }

  salvar() {
    if (!this.form.placa || !this.form.modelo || !this.form.cor) {
      alert('Preencha Placa, Modelo e Cor.');
      return;
    }

    const placa = this.form.placa.toUpperCase().trim();

    if (this.editando) {
      this.veiculos = this.veiculos.map(v =>
        v.id === this.editando!.id
          ? {
              ...v,
              placa,
              modelo: this.form.modelo as string,
              cor: this.form.cor as string,
              ativo: this.form.ativo ?? true,
            }
          : v
      );
    } else {
      const nextId = this.veiculos.length ? Math.max(...this.veiculos.map(v => v.id)) + 1 : 1;
      this.veiculos = [
        ...this.veiculos,
        {
          id: nextId,
          placa,
          modelo: this.form.modelo as string,
          cor: this.form.cor as string,
          ativo: this.form.ativo ?? true,
        },
      ];
    }

    this.salvarUsuario();
    this.cancelar();
  }
}


