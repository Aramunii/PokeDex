import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

 
  getPokemonImageUrl(id: string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

    getTypeColor(type: string): string {
    switch (type) {
      case 'normal': return '#A8A77A';
      case 'fire': return '#EE8130';
      case 'water': return '#6390F0';
      case 'grass': return '#7AC74C';
      case 'electric': return '#F7D02C';
      case 'ice': return '#96D9D6';
      case 'fighting': return '#C22E28';
      case 'poison': return '#A33EA1';
      case 'ground': return '#E2BF65';
      case 'flying': return '#A98FF3';
      case 'psychic': return '#F95587';
      case 'bug': return '#A6B91A';
      case 'rock': return '#B6A136';
      case 'ghost': return '#735797';
      case 'dragon': return '#6F35FC';
      case 'steel': return '#B7B7CE';
      case 'fairy': return '#D685AD';
      default: return '#777';
    }
  }
  
}
