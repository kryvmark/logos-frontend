import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'censor';
  words: string[] = [];
  newWord: string = '';
  text: string = '';

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
