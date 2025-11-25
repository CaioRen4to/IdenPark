import { Component } from '@angular/core';
import { Sidebar } from '../../ComponentsCompartilhados/sidebar/sidebar';
import { AlunoDashboard } from '../../ComponentsCompartilhados/aluno-dashboard/aluno-dashboard';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-alunos',
  imports: [Sidebar, AlunoDashboard, RouterOutlet],
  templateUrl: './alunos.html',
  styleUrl: './alunos.css',
})
export class Alunos {

}
