import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  template: `
    <h2 mat-dialog-title [ngClass]="data.dialogClass">{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="close()">OK</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; dialogClass: string }
  ) {}

  close() {
    this.dialogRef.close();
  }
}
