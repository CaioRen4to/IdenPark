import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardCarteira } from "../../ComponentsCompartilhados/dashboard-carteira/dashboard-carteira";
import { Sidebar } from "../../ComponentsCompartilhados/sidebar/sidebar";

@Component({
  selector: 'app-carteira',
  imports: [DashboardCarteira, Sidebar],
  templateUrl: './carteira.html',
  styleUrl: './carteira.css',
})
export class Carteira {

}
