import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Game {
  id: string;
  slug: string;
  title: string;
  providerName: string;
  thumb: { url: string };
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:5000/api/games';  // Games API
  private slotApiUrl = 'https://games-backend-gmcvcgb2hnhph6f2.spaincentral-01.azurewebsites.net/api/slot/spin'; // Slot Machine API

  constructor(private http: HttpClient) {}

  // Fetch games with optional search filter
  getGames(searchTerm: string = ''): Observable<Game[]> {
    const url = searchTerm ? `${this.apiUrl}?search=${searchTerm}` : this.apiUrl;
    return this.http.get<Game[]>(url);
  }

  // Call backend API to spin the slot machine
  spinSlotMachine(): Observable<{ result: string[], reward: number, balance: number }> {
    return this.http.post<{ result: string[], reward: number, balance: number }>(this.slotApiUrl, {});
  }
}
