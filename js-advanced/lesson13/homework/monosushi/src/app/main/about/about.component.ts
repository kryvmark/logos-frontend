import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  public ui = {
    faqItem: -1,

    toggleItem: (index: number) => {
      if (index === this.ui.faqItem) this.ui.faqItem = -1;
      else this.ui.faqItem = index;
    },

    appFirebase: (path: string) => {
      return `https://firebasestorage.googleapis.com/v0/b/monosushi-63969.appspot.com/o/app%2F${path.replaceAll(
        '/',
        '%2F'
      )}?alt=media`;
    },
  };
}
