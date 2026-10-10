import { AfterViewInit, Component, inject, input, OnInit } from '@angular/core';
import { FlashCardBox } from '../flash-card-box/flash-card-box';
import { FCBox, GetBox } from '../get-box';

@Component({
  imports: [FlashCardBox],
  selector: 'app-boxbox',
  styleUrl: './boxbox.css',
  templateUrl: './boxbox.html',
})
export class Boxbox implements OnInit {
  limit = input.required<number>()
  boxes: FCBox[] = []
  private gb = inject(GetBox)

  ngOnInit(): void {
    for (let i = 0; i < this.limit(); i++) {
      this.boxes.push(this.gb.getbox(String(i)))
    }
  }
}
