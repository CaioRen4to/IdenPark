import { Component } from '@angular/core';
import { Sidebar } from '../../ComponentsCompartilhados/sidebar/sidebar';
import { AlunoDashboard } from '../../ComponentsCompartilhados/aluno-dashboard/aluno-dashboard';
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-alunos',
  imports: [Sidebar, AlunoDashboard, RouterOutlet],
=======
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-alunos',
  imports: [Sidebar, AlunoDashboard],
>>>>>>> 6e1974a58097b94a6678299a2e94596eea8d7638
  templateUrl: './alunos.html',
  styleUrl: './alunos.css',
})
export class Alunos {

}
