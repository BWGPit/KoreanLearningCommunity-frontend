import { TmplAstUnknownBlock } from '@angular/compiler';
import { Component, computed, input, OnInit, signal, model, Signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
export type QuizMode = "repetition" | "finite" | "sequential"

export class QuizException extends Error {}

export class QuizManager {
  listSrc: string[]
  listDest: string[]
  mode: QuizMode = "sequential"

  private i: number = 0
  private _correctCount: number = 0
  private _wordCount: number = 0

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

  get correctCount(): number {
    return this._correctCount
  }

  get wordCount(): number {
    return this._wordCount
  }

  ask(): string | null {
    // Asks a question
    if (this.mode == "sequential") {
      if (this.mode == "sequential" && this.i < this.listSrc.length) {
        return this.listSrc[this.i]
      }
    }
    // TODO: ALTRI CASI IN CUI AGGIORNA COMUNQUE LA i MA IN MODO DIVERSO (RANDOMICO)
    // If mode is finite (or sequential) it stops at the end of the array
    return null
  }

  answer(a: string): [boolean, string] {
    // Returns whether the answer was correct and the correct answer
    this._wordCount++ // another word has been answered
    let correct: string = this.listDest[this.i]
    this.i++ // updates the counter
    if (a.toLowerCase() == correct.toLowerCase()) {
      this._correctCount++
      return [true, correct]
    }
    return [false, correct]
  }
}

@Component({
  imports: [FormsModule],
  selector: 'app-quiz',
  styleUrl: './quiz.css',
  templateUrl: './quiz.html',
})
export class Quiz implements OnInit {
  listSrc = input.required<string[]>()
  listDest = input.required<string[]>()
  qm = computed(() => new QuizManager(this.listSrc(), this.listDest()))
  writtenValue: string = ""
  counterString = signal<string>("")
  question = signal<string>("뭔가 있지")
  result = signal<string>("이게 뭐야?")

  ask(): void {
    this.counterString.set(String(this.qm().correctCount) + "/" + String(this.qm().wordCount))
    let thisQuestion: string | null = this.qm().ask()
    if (thisQuestion) this.question.set(thisQuestion)
  }

  answer(): void {
    let [isValid, correctAnswer]: [boolean, string] = this.qm().answer(this.writtenValue)
    if (isValid) {
      this.result.set("정답!")
    } else {
      this.result.set("오답. 정답은 [" + correctAnswer + "]입니다.")
    }

    this.writtenValue = "" // Clears previous answer

    this.ask()
  }

  ngOnInit(): void {
    this.ask()
  }

  reset(): void {
    console.log("RESET")
    this.qm = computed(() => new QuizManager(this.listSrc(), this.listDest()))
    this.result.set("")
    this.ask()
  }
}
