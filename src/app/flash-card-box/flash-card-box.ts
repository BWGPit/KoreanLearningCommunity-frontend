import { Component } from '@angular/core';

type Language = "kr" | "en" | "it"
type Mapping = [string[], string[]]

@Component({
  imports: [],
  selector: 'app-flash-card-box',
  styleUrl: './flash-card-box.css',
  templateUrl: './flash-card-box.html',
})
export class FlashCardBox {
  srcLanguage: Language = "kr"
  destLanguage: Language = "it"
  name: string = "Direzioni"
  listSrc: string[] = ["북", "남", "동", "서"]
  listDest: string[] = ["Nord", "Sud", "Est", "Ovest"]
  mapping: Mapping = [this.listSrc, this.listDest]
  // TODO: ACTUALLY LOAD THESE DATA FROM DATABASE
}
