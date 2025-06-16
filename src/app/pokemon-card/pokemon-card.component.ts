import { Component, OnInit, Input } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HelpersService } from '../services/helpers.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg]
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemon: any;

  constructor(private helpersService: HelpersService ) { }

  ngOnInit() {}

  getPokemonImageUrl(id: string): string {
      return this.helpersService.getPokemonImageUrl(id);
  }

  capitalizeFirstLetter(str: string): string {
    return this.helpersService.capitalizeFirstLetter(str);
  }
}
