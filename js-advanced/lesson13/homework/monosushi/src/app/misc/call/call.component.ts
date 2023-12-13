import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
})
export class CallComponent {
  public form!: FormGroup;

  constructor(private dialog: MatDialogRef<CallComponent>, private forms: FormBuilder) {
    this.form = this.forms.group({
      firstName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
  }

  close(): void {
    this.dialog.close();
  }
}
