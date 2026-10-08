import { Component, signal, input, inject, computed } from '@angular/core';
import { GetBox } from '../get-box';

export type Language = "kr" | "en" | "it"
export type Mapping = [string[], string[]]

@Component({
  imports: [],
  selector: 'app-flash-card-box',
  styleUrl: './flash-card-box.css',
  templateUrl: './flash-card-box.html',
})
export class FlashCardBox {
  srcLanguage = input.required<Language>()
  destLanguage = input.required<Language>()
  name = input.required<string>()
  mapping = input.required<Mapping>()
  listSrc = computed(() => this.mapping()[0])
  listDest = computed(() => this.mapping()[1])
}
