import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonBackButton, 
  IonButtons, 
  IonSpinner, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonImg, 
  IonItem, 
  IonLabel, 
  IonText, 
  IonItemDivider, 
  IonChip, 
  IonList, 
  IonProgressBar,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { HelpersService } from '../services/helpers.service';
import { FavoritesService, FavoritePokemon } from '../services/favorites.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonItem,
    IonLabel,
    IonText,
    IonItemDivider,
    IonChip,
    IonList,
    IonProgressBar,
    IonButton,
    IonIcon
  ]
})
export class DetailPage implements OnInit {
  pokemonId: string | null = null;
  pokemonDetails: any = null;
  isLoading = true;
  error: string | null = null;
  isFavorite = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    private helpersService: HelpersService,
    private favoritesService: FavoritesService
  ) {
    addIcons({ heart, heartOutline });
  }

  ngOnInit() {
    this.pokemonId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.pokemonId) {
      this.loadPokemonDetails();
    }
  }

  loadPokemonDetails() {
    this.isLoading = true;
    this.error = null;
    this.pokemonService.getPokemonDetails(this.pokemonId!).subscribe({
      next: (data) => {
        this.pokemonDetails = data;
        this.isLoading = false;
        this.checkFavoriteStatus();
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes do Pokémon:', err);
        this.error = 'Não foi possível carregar os detalhes do Pokémon.';
        this.isLoading = false;
      }
    });
  }

  checkFavoriteStatus() {
    if (this.pokemonDetails) {
      this.isFavorite = this.favoritesService.isFavorite(this.pokemonDetails.id.toString());
    }
  }

  toggleFavorite() {
    if (this.pokemonDetails) {
      const favoritePokemon: FavoritePokemon = {
        id: this.pokemonDetails.id.toString(),
        name: this.pokemonDetails.name,
        imageUrl: this.getPokemonImageUrl(this.pokemonDetails.id),
        types: this.pokemonDetails.types
      };
      
      this.favoritesService.toggleFavorite(favoritePokemon);
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
}