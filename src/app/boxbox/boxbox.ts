import { Component, inject } from '@angular/core';
import { FlashCardBox } from '../flash-card-box/flash-card-box';
import { FCBox, GetBox } from '../get-box';

@Component({
  imports: [FlashCardBox],
  selector: 'app-boxbox',
  styleUrl: './boxbox.css',
  templateUrl: './boxbox.html',
})
export class Boxbox {
  limit: number = 1
  boxes: FCBox[] = []
  private gb = inject(GetBox)
  constructor() {
    for (let i = 0; i < this.limit; i++) {
      this.boxes.push(this.gb.getbox(String(i)))
    }
  }
}
