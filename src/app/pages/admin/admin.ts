import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from "../../ComponentsCompartilhados/sidebar/sidebar";
import { AdminDashboardComponent } from "../../ComponentsCompartilhados/admin-dashboard/admin-dashboard.component";

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
  imports: [CommonModule, Sidebar, AdminDashboardComponent],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Admin {}