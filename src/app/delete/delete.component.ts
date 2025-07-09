import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-delete',
  imports: [MatButtonModule, MatDialogContent, MatDialogModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  constructor(public dialog: MatDialogRef<DeleteComponent>) { }

  close() {
    this.dialog.close(false);
  }
  confirm() {
    this.dialog.close(true)
  }



}
