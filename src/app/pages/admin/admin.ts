import { Component } from '@angular/core';
import { Sidebar } from "../../ComponentsCompartilhados/sidebar/sidebar";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [Sidebar],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

}
