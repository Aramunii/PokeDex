import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface FavoritePokemon {
  id: string;
  name: string;
  imageUrl: string;
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'pokemon_favorites';
  private favoritesSubject = new BehaviorSubject<FavoritePokemon[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const favorites = JSON.parse(stored);
      this.favoritesSubject.next(favorites);
    }
  }

  private saveFavorites(favorites: FavoritePokemon[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  getFavorites(): FavoritePokemon[] {
    return this.favoritesSubject.value;
  }

  addToFavorites(pokemon: FavoritePokemon): void {
    const currentFavorites = this.getFavorites();
    const exists = currentFavorites.find(fav => fav.id === pokemon.id);
    
    if (!exists) {
      const updatedFavorites = [...currentFavorites, pokemon];
      this.saveFavorites(updatedFavorites);
    }
  }

  removeFromFavorites(pokemonId: string): void {
    const currentFavorites = this.getFavorites();
    const updatedFavorites = currentFavorites.filter(fav => fav.id !== pokemonId);
    this.saveFavorites(updatedFavorites);
  }

  isFavorite(pokemonId: string): boolean {
    const currentFavorites = this.getFavorites();
    return currentFavorites.some(fav => fav.id === pokemonId);
  }

  toggleFavorite(pokemon: FavoritePokemon): void {
    if (this.isFavorite(pokemon.id)) {
      this.removeFromFavorites(pokemon.id);
    } else {
      this.addToFavorites(pokemon);
    }
  }
} 