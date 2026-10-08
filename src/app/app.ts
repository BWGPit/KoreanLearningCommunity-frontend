import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Boxbox } from './boxbox/boxbox';

@Component({
  imports: [RouterOutlet, Boxbox],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Korean Learning Community');
}
