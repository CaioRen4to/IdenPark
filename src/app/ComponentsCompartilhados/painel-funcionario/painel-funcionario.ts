import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Veiculo {
  placa: string;
  modelo: string;
  cor: string;
  tipo: 'carro' | 'moto' | 'caminhonete';
  proprietario?: string;
  telefone?: string;
  horaEntrada: Date;
  status: 'estacionado' | 'saiu';
}

interface Historico {
  placa: string;
  tipo: 'entrada' | 'saida';
  hora: Date;
}

@Component({
  selector: 'app-painel-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './painel-funcionario.html',
  styleUrl: './painel-funcionario.css',
})
export class PainelFuncionario {
  
  funcionariosAtivos = 8;
  entradasHoje = 0;
  saidasHoje = 0;
  saldoTotal = 450.50;

  veiculos: Veiculo[] = [];
  historico: Historico[] = [];

  novoVeiculo = {
    placa: '',
    modelo: '',
    cor: '',
    tipo: '' as 'carro' | 'moto' | 'caminhonete',
    proprietario: '',
    telefone: ''
  };

  ngOnInit() {
    console.log('Dashboard carregado!');
  }

  get veiculosEstacionados(): Veiculo[] {
    return this.veiculos.filter(v => v.status === 'estacionado');
  }

  adicionarVeiculo() {

    if (!this.novoVeiculo.placa || !this.novoVeiculo.tipo) {
      alert('❌ Preencha os campos obrigatórios (Placa e Tipo)!');
      return;
    }

    const placaFormatada = this.novoVeiculo.placa.toUpperCase().trim();

    const jaExiste = this.veiculos.some(
      v => v.placa === placaFormatada && v.status === 'estacionado'
    );

    if (jaExiste) {
      alert('⚠️ Este veículo já está estacionado!');
      return;
    }

    const veiculo: Veiculo = {
      placa: placaFormatada,
      modelo: this.novoVeiculo.modelo || 'Não informado',
      cor: this.novoVeiculo.cor || 'Não informado',
      tipo: this.novoVeiculo.tipo,
      proprietario: this.novoVeiculo.proprietario,
      telefone: this.novoVeiculo.telefone,
      horaEntrada: new Date(),
      status: 'estacionado'
    };

    this.veiculos.push(veiculo);

    this.historico.unshift({
      placa: placaFormatada,
      tipo: 'entrada',
      hora: new Date()
    });

    this.entradasHoje++;

    this.limparFormulario();

    console.log('✅ Veículo adicionado:', veiculo);
    alert(`✅ Veículo ${placaFormatada} registrado com sucesso!`);
  }

  registrarSaida(index: number) {
    const veiculo = this.veiculosEstacionados[index];
    
    if (!veiculo) return;

    const confirmacao = confirm(
      `Registrar saída do veículo ${veiculo.placa}?\n\nTempo estacionado: ${this.calcularTempo(veiculo.horaEntrada)}`
    );

    if (!confirmacao) return;

    const horas = this.calcularHoras(veiculo.horaEntrada);
    const valor = this.calcularValor(horas);

   
    veiculo.status = 'saiu';

    
    this.historico.unshift({
      placa: veiculo.placa,
      tipo: 'saida',
      hora: new Date()
    });
    this.saidasHoje++;
    this.saldoTotal += valor;

    alert(`✅ Saída registrada!\n\nTempo: ${this.calcularTempo(veiculo.horaEntrada)}\nValor: R$ ${valor.toFixed(2)}`);
    
    console.log('🚗 Saída registrada:', veiculo);
  }

  // calcular tempo
  calcularTempo(horaEntrada: Date): string {
    const agora = new Date();
    const diff = agora.getTime() - new Date(horaEntrada).getTime();
    
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (horas === 0) {
      return `${minutos} min`;
    }
    
    return `${horas}h ${minutos}min`;
  }

  // calcular hrs
  calcularHoras(horaEntrada: Date): number {
    const agora = new Date();
    const diff = agora.getTime() - new Date(horaEntrada).getTime();
    const horas = Math.ceil(diff / (1000 * 60 * 60)); // Arredonda pra cima
    return horas;
  }

  // calcuar valor
  calcularValor(horas: number): number {
    // Exemplo: R$ 5,00 primeira hora + R$ 3,00 hora adicional
    if (horas <= 1) {
      return 5.00;
    }
    return 5.00 + (horas - 1) * 3.00;
  }

  limparFormulario() {
    this.novoVeiculo = {
      placa: '',
      modelo: '',
      cor: '',
      tipo: '' as 'carro' | 'moto' | 'caminhonete',
      proprietario: '',
      telefone: ''
    };
  }

}
