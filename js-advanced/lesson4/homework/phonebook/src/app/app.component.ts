import { Component, HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'phonebook';
  public query = '';
  public modalOpen: boolean | null = false;
  public contacts: Contact[] = [];
  public editIndex = -1;
  public sorting = SortBy.FirstName;
  public sortAscending = true;

  public newContact: Contact = {
    firstName: '',
    secondName: '',
    phone: ''
  };

  protected shadowTop = 0;
  protected sortBy = SortBy;

  constructor(private ref: ChangeDetectorRef) { }

  openModal(): void {
    document.body.style.overflowY = 'hidden';
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = null;
    setTimeout(() => {
      document.body.style.overflowY = '';
      this.modalOpen = false;
    }, 250);
  }

  clear(): void {
    this.query = '';
  }

  changeOrder(reverse: boolean, sorting?: SortBy): void {
    if (reverse) this.sortAscending = !this.sortAscending;
    else if (!reverse && sorting) {
      if (this.sorting != sorting) this.sorting = sorting;
      else this.sortAscending = !this.sortAscending;
    }
    this.ref.markForCheck();
  }

  validateContact(): boolean | null {
    if (this.editIndex >= 0
      && this.contacts.map(contact => contact.phone).indexOf(this.newContact.phone) >= 0
      && this.contacts.map(contact => contact.phone).indexOf(this.newContact.phone) != this.editIndex) return false;

    if ((this.newContact.firstName === '') || (this.newContact.phone === '')) return null;
    return true;
  }

  create(): void {
    this.clear();
    this.contacts.push(Object.assign({}, this.newContact));
    this.closeModal();
    this.resetForm();
  }

  read(phone: string): void {
    this.clear();
    this.openModal();
    this.newContact = Object.assign({}, this.contacts[this.contacts.map(contact => contact.phone).indexOf(phone)]);
    this.editIndex = this.contacts.map(contact => contact.phone).indexOf(phone);
  }

  update(): void {
    this.closeModal();
    this.contacts[this.editIndex] = Object.assign({}, this.newContact);
    this.editIndex = -1;
    this.resetForm();
  }

  delete(phone: string): void {
    this.clear();
    this.contacts.splice(this.contacts.map(contact => contact.phone).indexOf(phone), 1);
  }

  private resetForm(): void {
    this.newContact.firstName = '';
    this.newContact.secondName = '';
    this.newContact.phone = '';
  }

  @HostListener('window:scroll', [])
  protected onWindowScroll(): void {
    this.shadowTop = window.scrollY
  }
}

export type Contact = {
  firstName: string,
  secondName: string,
  phone: string
}

export enum SortBy {
  FirstName = 'firstName',
  SecondName = 'secondName',
  Phone = 'phone'
}