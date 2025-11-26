import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Carteira } from "./pages/carteira/carteira";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Carteira],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('IdenPark');
}
