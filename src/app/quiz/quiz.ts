import { TmplAstUnknownBlock } from '@angular/compiler';
import { Component, computed, input, OnInit, signal, model, Signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { printPercent, randint } from '../utils';
export type QuizMode = "repetition" | "finite" | "sequential"

export class QuizException extends Error {}

export class QuizManager {
  listSrc: string[]
  listDest: string[]
  mode: QuizMode

  private i: number = 0
  private _correctCount: number = 0
  private _wordCount: number = 0

  constructor(listSrc: string[], listDest: string[], mode: QuizMode = "sequential") {
    if (listSrc.length == 0 || listDest.length == 0) {
      throw new QuizException("Cannot use an empty array")
    }
    if (listSrc.length != listDest.length) {
      throw new QuizException("Arrays must be of the same length")
    }
    this.listSrc = listSrc
    this.listDest = listDest
    this.mode = mode
  }

  get correctCount(): number {
    return this._correctCount
  }

  get wordCount(): number {
    return this._wordCount
  }

  get accuracy(): number {
    if (this._wordCount == 0) return 1 // A 0-question accuracy is trivially 100%
    if (this._correctCount == 0) return 0
    return this._correctCount/this._wordCount
  }

  get completion(): number {
    if (this._wordCount == 0) return 0
    return this._wordCount/this.listSrc.length
  }

  private updateCounter() {
    if (this.mode == "sequential") {
      this.i++
    } else if (this.mode == "repetition") {
      this.i = randint(this.listSrc.length, 0)
    }
  }

  ask(): string | null {
    // Asks a question
    if (((this.mode == "sequential" || this.mode == "finite") && this.i < this.listSrc.length) || this.mode == "repetition") {
        return this.listSrc[this.i]
    }
    // TODO: ALTRI CASI IN CUI AGGIORNA COMUNQUE LA i MA IN MODO DIVERSO (RANDOMICO)
    // If mode is finite (or sequential) it stops at the end of the array
    return null
  }

  answer(a: string): [boolean, string] {
    // Returns whether the answer was correct and the correct answer
    this._wordCount++ // another word has been answered
    let correct: string = this.listDest[this.i]
    this.updateCounter()
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
  qm = computed(() => new QuizManager(this.listSrc(), this.listDest(), "repetition"))
  writtenValue: string = ""
  counterString = signal<string>("")
  question = signal<string>("뭔가 있지")
  result = signal<string>("이게 뭐야?")

  private setCounterString(): void {
    let cs: string = (
      // 정확 = accuracy
      "정확: " + printPercent(this.qm().accuracy) + " (" + 
      String(this.qm().correctCount) + "/" + String(this.qm().wordCount) + ")"
    )
    this.counterString.set(cs)
  }

  ask(): void {
    this.setCounterString()
    let thisQuestion: string | null = this.qm().ask()
    if (thisQuestion) this.question.set(thisQuestion)
  }

  answer(): void {
    // "base case" to prevent typos
    if (this.writtenValue.replaceAll(" ", "") == "") return

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
