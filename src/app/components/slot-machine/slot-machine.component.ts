import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GameService } from '../../services/game.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component'; // Import Dialog Component

@Component({
  selector: 'app-slot-machine',
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatDialogModule] 
})
export class SlotMachineComponent {
  balance = 20;
  result: string[] = ["?", "?", "?"];
  isSpinning = false;

  // Currency Conversion
  convertAmount: number = 1;
  selectedCurrency: string = 'EUR';
  convertedBalance: number | null = null;
  availableCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'JPY'];

  // Symbol images
  symbolImages: { [key: string]: string } = {
    cherry: '/assets/slot/cherry.png',
    lemon: '/assets/slot/lemon.png',
    apple: '/assets/slot/apple.png',
    banana: '/assets/slot/banana.png',
    "?": '/assets/slot/question-mark.png'
  };

  constructor(private gameService: GameService, private http: HttpClient, private dialog: MatDialog) {}

  spin() {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.result = ["?", "?", "?"];

    // Get all possible symbols EXCEPT the question mark
    const symbols = Object.keys(this.symbolImages).filter(symbol => symbol !== "?");
    let cycleCount = 0;

    // Start animation: Cycle through all symbols except "?" before stopping on the final result
    const animationInterval = setInterval(() => {
      this.result = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ];
      cycleCount++;

      // Stop animation after a few cycles
      if (cycleCount >= 15) {
        clearInterval(animationInterval);

        // Fetch actual spin result from backend
        setTimeout(() => {
          this.http.post<{ result: string[]; reward: number; balance: number }>(
            'https://games-backend-gmcvcgb2hnhph6f2.spaincentral-01.azurewebsites.net/api/slot/spin',
            { betAmount: 1 }
          ).subscribe(
            (data) => {
              this.result = data.result;
              this.balance = data.balance;

              // Determine if it's a win or a loss
              const isWin = data.reward > 0;
              this.openDialog(
                isWin ? "Winner!" : "Lost",
                isWin ? `You won ${data.reward} coins! 🎉` : "No win! Try again.",
                isWin ? "winner-dialog" : "loser-dialog"
              );

              this.isSpinning = false;
            },
            (error) => {
              this.openDialog("Lost", error.error?.message || "Not enough coins!", "loser-dialog");
              this.isSpinning = false;
            }
          );
        }, 500); // Delay slightly after animation stops
      }
    }, 100); // Change symbols every 100ms
  }

  // Open dialog with dynamic title and color
  openDialog(title: string, message: string, dialogClass: string) {
    this.dialog.open(DialogComponent, {
      data: { title, message, dialogClass }
    });
  }

  convert() {
    if (!this.convertAmount || this.convertAmount <= 0 || this.convertAmount > this.balance) {
      this.openDialog("Invalid Input", "Please enter a valid amount.", "loser-dialog");
      return;
    }

    this.http.post<{ convertedAmount: number, currency: string }>(
      'https://games-backend-gmcvcgb2hnhph6f2.spaincentral-01.azurewebsites.net/api/currency/convert',
      { amount: this.convertAmount, currency: this.selectedCurrency }
    ).subscribe(
      (data) => {
        this.convertedBalance = data.convertedAmount;
        this.openDialog("Success", `Converted to ${data.convertedAmount} ${this.selectedCurrency}!`, "winner-dialog");
      },
      () => {
        this.openDialog("Conversion Failed", "Failed to convert currency.", "loser-dialog");
      }
    );
  }
}
