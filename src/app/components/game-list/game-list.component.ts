import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService, Game } from '../../services/game.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    SearchBarComponent, 
    MatCardModule, 
    MatPaginatorModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatOptionModule
  ]
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  paginatedGames: Game[] = [];
  pageSize = 6; 
  pageIndex = 0;
  private cache = new Map<string, Game[]>(); // Client-side cache
  private lastSearchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.fetchGames();
  }

  fetchGames(searchTerm: string = ''): void {
    if (this.cache.has(searchTerm)) {
      console.log("✅ Using client cache:", searchTerm);
      this.games = this.cache.get(searchTerm)!;
      this.updatePagination();
      return;
    }

    this.gameService.getGames(searchTerm).subscribe((data) => {
      this.games = data;
      this.cache.set(searchTerm, data); // Store in cache
      this.updatePagination();
    });
  }

  onSearch(searchTerm: string) {
    if (searchTerm === this.lastSearchTerm) return; // Avoid duplicate requests
    this.lastSearchTerm = searchTerm;

    this.pageIndex = 0; 
    this.fetchGames(searchTerm);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedGames = this.games.slice(startIndex, endIndex);
  }
}
