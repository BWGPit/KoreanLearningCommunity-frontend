import { Component, signal, input, inject, computed, ViewChild, AfterViewInit } from '@angular/core';
import { GetBox } from '../get-box';
import { Quiz } from '../quiz/quiz';
import { NgClass } from '../../../node_modules/@angular/common/types/_common_module-chunk';

export type Language = "kr" | "en" | "it"
export type Mapping = [string[], string[]]

export type IsHidden = "visible" | "hidden"

@Component({
  imports: [Quiz],
  selector: 'app-flash-card-box',
  styleUrl: './flash-card-box.css',
  templateUrl: './flash-card-box.html'
})
export class FlashCardBox implements AfterViewInit {
  srcLanguage = input.required<Language>()
  destLanguage = input.required<Language>()
  name = input.required<string>()
  mapping = input.required<Mapping>()
  listSrc = computed(() => this.mapping()[0])
  listDest = computed(() => this.mapping()[1])

  @ViewChild(Quiz) child!: Quiz

  ngAfterViewInit(): void {}

  parentClass = signal<IsHidden>("visible")
  childClass = signal<IsHidden>("hidden")

  beginQuiz() {
    this.parentClass.set("hidden")
    this.childClass.set("visible")
  }

  exitQuiz() {
    this.parentClass.set("visible")
    this.childClass.set("hidden")
    this.child.reset()
  }
}
