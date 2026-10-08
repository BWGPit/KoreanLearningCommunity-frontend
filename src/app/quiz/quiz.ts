import { TmplAstUnknownBlock } from '@angular/compiler';
import { Component, computed, input, OnInit, signal } from '@angular/core';

export type QuizMode = "repetition" | "finite" | "sequential"

export class QuizException extends Error {}

export class QuizManager {
  listSrc: string[]
  listDest: string[]
  mode: QuizMode = "sequential"

  private i: number = 0

  constructor(listSrc: string[], listDest: string[]) {
    if (listSrc.length == 0 || listDest.length == 0) {
      throw new QuizException("Cannot use an empty array")
    }
    if (listSrc.length != listDest.length) {
      throw new QuizException("Arrays must be of the same length")
    }
    this.listSrc = listSrc
    this.listDest = listDest
  }

  ask(): string | null {
    // Asks a question
    if (this.mode == "sequential") {
      if (this.mode == "sequential" && this.i < this.listSrc.length) {
        this.i++ // updates the counter
        return this.listSrc[this.i-1]
      }
    }
    // TODO: ALTRI CASI IN CUI AGGIORNA COMUNQUE LA i MA IN MODO DIVERSO (RANDOMICO)
    // If mode is finite (or sequential) it stops at the end of the array
    return null
  }

  answer(a: string): [boolean, string] {
    // Returns whether the answer was correct and the correct answer
    let correct: string = this.listDest[this.i]
    if (a.toLowerCase() == correct.toLowerCase()) {
      return [true, correct]
    }
    return [false, correct]
  }
}

@Component({
  imports: [],
  selector: 'app-quiz',
  styleUrl: './quiz.css',
  templateUrl: './quiz.html',
})
export class Quiz implements OnInit {
  listSrc = input.required<string[]>()
  listDest = input.required<string[]>()
  qm = computed(() => new QuizManager(this.listSrc(), this.listDest()))

  private print(elementId: string, text: string | null) {
    // Prints to the innerText of an element
    let cqelement: HTMLElement | null = document.getElementById(elementId)
    if (cqelement && text) {
      cqelement.innerText = text
    }
  }

  ask(): void {
    let thisQuestion: string | null = this.qm().ask()
    this.print("current-question", thisQuestion)
  }

  answer(): void {
    console.log("TODO: ANSWER!")
    this.ask()
  }

  ngOnInit(): void {
    this.ask()
  }

  reset(): void {
    this.qm = computed(() => new QuizManager(this.listSrc(), this.listDest()))
    this.ask()
  }

  exit(): void {
    document.getElementById("flashcard-view")?.classList.remove("hidden")
    document.getElementById("quizview")?.classList.add("hidden")
    this.reset()
  }
}
