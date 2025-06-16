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
  IonProgressBar 
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { HelpersService } from '../services/helpers.service';

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
    IonProgressBar
  ]
})
export class DetailPage implements OnInit {
  pokemonId: string | null = null;
  pokemonDetails: any = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    private helpersService: HelpersService
  ) { }

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
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes do Pokémon:', err);
        this.error = 'Não foi possível carregar os detalhes do Pokémon.';
        this.isLoading = false;
      }
    });
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