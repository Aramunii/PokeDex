import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonButton, IonIcon, IonChip } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HelpersService } from '../services/helpers.service';
import { FavoritesService, FavoritePokemon } from '../services/favorites.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonButton, IonIcon, IonChip]
})
export class PokemonCardComponent implements OnInit, OnChanges {

  @Input() pokemon: any;
  isFavorite = false;

  constructor(
    private helpersService: HelpersService,
    private favoritesService: FavoritesService
  ) {
    addIcons({ heart, heartOutline });
  }

  ngOnInit() {
    this.checkFavoriteStatus();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemon']) {
      this.checkFavoriteStatus();
    }
  }

  getPokemonImageUrl(id: string): string {
    return this.helpersService.getPokemonImageUrl(id);
  }

  capitalizeFirstLetter(str: string): string {
    return this.helpersService.capitalizeFirstLetter(str);
  }

  getTypeColor(type: string): string {
    return this.helpersService.getTypeColor(type);
  }

  checkFavoriteStatus() {
    this.isFavorite = this.favoritesService.isFavorite(this.pokemon.id.toString());
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    const favoritePokemon: FavoritePokemon = {
      id: this.pokemon.id.toString(),
      name: this.pokemon.name,
      imageUrl: this.getPokemonImageUrl(this.pokemon.id),
      types: this.pokemon.types
    };
    this.favoritesService.toggleFavorite(favoritePokemon);
    this.checkFavoriteStatus();
  }
}
