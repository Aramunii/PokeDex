import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonImg, 
  IonChip, 
  IonButton, 
  IonIcon,
  IonText,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FavoritesService, FavoritePokemon } from '../services/favorites.service';
import { HelpersService } from '../services/helpers.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline, arrowBack } from 'ionicons/icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonChip,
    IonButton,
    IonIcon,
    IonText,
    IonBackButton,
    IonButtons
  ]
})
export class FavoritesPage implements OnInit {
  favorites: FavoritePokemon[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private helpersService: HelpersService,
    private router: Router,
    private location: Location
  ) {
    addIcons({ heart, heartOutline, arrowBack });
  }

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favorites = this.favoritesService.getFavorites();
  }

  removeFromFavorites(pokemon: FavoritePokemon) {
    this.favoritesService.removeFromFavorites(pokemon.id);
    this.loadFavorites();
  }

  goToPokemonDetail(pokemonId: string) {
    this.router.navigate(['/pokemon-detail', pokemonId]);
  }

  getTypeColor(type: string): string {
    return this.helpersService.getTypeColor(type);
  }

  capitalizeFirstLetter(str: string): string {
    return this.helpersService.capitalizeFirstLetter(str);
  }

  getPokemonImageUrl(id: string): string {
    return this.helpersService.getPokemonImageUrl(id);
  }

  goBack() {
    this.location.back();
  }
} 