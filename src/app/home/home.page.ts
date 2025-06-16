import { Component, OnInit } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  InfiniteScrollCustomEvent,
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButton,
  IonIcon,
  IonButtons
} from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonButton,
    IonIcon,
    IonButtons,
    PokemonCardComponent
  ],
})
export class HomePage implements OnInit {

  pokemonList: any[] = [];
  offset: number = 0;
  limit: number = 20;

  constructor(private pokemonService: PokemonService,private router: Router) {
    addIcons({ heart });
  }

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(event?: InfiniteScrollCustomEvent){
    this.pokemonService.getPokemonList(this.offset,this.limit).subscribe({
      next: (data) =>{
        data.results.forEach((pokemon: any) =>{
          const id = this.pokemonService.getPokemonIdFromUrl(pokemon.url);
          this.pokemonList.push({ ...pokemon,id });
        });
        this.offset += this.limit;

        if(event){
          event.target.complete();
          if(data.next === null){ 
            event.target.disabled = true;
          }
        }
      },
      error: (err) =>{
        console.error("Erro ao carregar a lista de Pokémon",err);
        if(event){
          event.target.complete();
        }
      }
    });
  }

  onIonInfinite(event: InfiniteScrollCustomEvent){
    this.loadPokemon(event);
  }

  goToPokemonDetail(id: string){
    this.router.navigate(['/pokemon-detail',id]);
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }
}
