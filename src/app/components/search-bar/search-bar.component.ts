import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(debounceTime(500)).subscribe((searchTerm) => {
      this.searchEvent.emit(searchTerm);
    });
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.trim();
    this.searchSubject.next(searchTerm); // Debounce applied correctly
  }
}
