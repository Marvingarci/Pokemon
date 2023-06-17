import { Pipe, PipeTransform } from '@angular/core';
import { MainRegion } from '../models/Generation';
import { Pokemon } from '../models/Pokemon';

@Pipe({
  name: 'sortGeneration'
})
export class SortGenerationPipe implements PipeTransform {

  transform(pokemons: MainRegion[], search: string): MainRegion[] {
    if(search == ''){
      return pokemons
    }else{
      return pokemons.filter(({pokemon}) =>  pokemon.id.toString().includes(search) || pokemon.name.toLowerCase().includes(search.toLowerCase()))
    }
      
  }

}
