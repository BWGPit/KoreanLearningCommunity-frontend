import { AfterViewInit, Component, inject, input, OnInit, signal } from '@angular/core';
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
  boxes = signal<FCBox[]>([])
  private gb = inject(GetBox)

  ngOnInit(): void {
    (async () => {for (let i = 0; i < this.limit(); i++) {
      this.gb.getbox(String(i)).then((thisbox) => {
        console.log("This box:", thisbox)
        this.boxes.update(prev => [...prev, thisbox])
        console.log(this.boxes())
      }
      )
    }})()
  }
}
