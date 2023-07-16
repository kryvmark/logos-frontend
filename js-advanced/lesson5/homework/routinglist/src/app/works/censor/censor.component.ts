import { Component } from '@angular/core';

@Component({
  selector: 'app-censor',
  templateUrl: './censor.component.html',
  styleUrls: ['./censor.component.scss']
})
export class CensorComponent {
  public words: string[] = [];
  public newWord: string = '';
  public text: string = '';

  add() { 
    if (!this.words.includes(this.newWord)) this.words.push(this.newWord);
    this.newWord = '';
  }

  reset() {
    this.words.length = 0;
    this.newWord = '';
  }

  censor() {
    for (const word of this.words) {
      let censored = this.text.split(word)
      this.text = censored.join('*'.repeat(word.length))
    }
  }
}
