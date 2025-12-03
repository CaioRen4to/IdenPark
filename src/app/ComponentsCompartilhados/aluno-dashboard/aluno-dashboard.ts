import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-aluno-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aluno-dashboard.html',
  styleUrls: ['./aluno-dashboard.css'],
})
export class AlunoDashboard {
  aviso: string | null = null;

mostrarAviso(texto: string) {
  this.aviso = texto;

  setTimeout(() => {
    this.aviso = null;
   }, 2000); // some depois de 2s
}

}
