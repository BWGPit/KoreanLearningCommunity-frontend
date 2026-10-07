import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlashCardBox } from './flash-card-box/flash-card-box';

@Component({
  imports: [RouterOutlet, FlashCardBox],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Korean Learning Community');
}
