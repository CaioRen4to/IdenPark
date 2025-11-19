import { Component } from '@angular/core';
import { Sidebar } from '../../ComponentsCompartilhados/sidebar/sidebar';
import { AlunoDashboard } from '../../ComponentsCompartilhados/aluno-dashboard/aluno-dashboard';

@Component({
  selector: 'app-alunos',
  imports: [Sidebar],
  templateUrl: './alunos.html',
  styleUrl: './alunos.css',
})
export class Alunos {

}
