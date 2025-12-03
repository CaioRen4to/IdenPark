import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../ComponentsCompartilhados/sidebar/sidebar';
import { AlunoDashboard } from '../../ComponentsCompartilhados/aluno-dashboard/aluno-dashboard';



@Component({
  selector: 'app-alunos',
  standalone: true,
  imports: [ Sidebar, AlunoDashboard],
  templateUrl: './alunos.html',
  styleUrls: ['./alunos.css'],
})
export class Alunos {}
