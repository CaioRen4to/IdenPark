import { Component } from '@angular/core';
import { PainelFuncionario } from '../../ComponentsCompartilhados/painel-funcionario/painel-funcionario';
import { Sidebar } from '../../ComponentsCompartilhados/sidebar/sidebar';

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [PainelFuncionario, Sidebar],
  templateUrl: './funcionario.html',
  styleUrl: './funcionario.css',
})


export class Funcionario {

}
