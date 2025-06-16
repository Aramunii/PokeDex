import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(offset: number = 0, limit: number = 20): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${id}`);
  }

  getPokemonIdFromUrl(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
  }
}
