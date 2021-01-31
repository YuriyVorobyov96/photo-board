import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string): void {
    if (!message || !message.length) {
      message = 'Error! Something went wrong!';
    }

    console.error(`Error: ${message}`);

    this._snackBar.open(message, 'Close', { duration: 2000 });
  }
}
