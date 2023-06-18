import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon';
import { Profile } from 'src/app/models/profile';
import { PokemondbService } from 'src/app/services/pokemondb.service';

@Component({
  selector: 'app-pokemon-show',
  templateUrl: './pokemon-show.component.html',
  styleUrls: ['./pokemon-show.component.css']
})
export class PokemonShowComponent implements OnInit {
  
  constructor(
    private pokemonService: PokemondbService
  ) { }

  types: any = {}

  @Input() profile!: Profile
  pokemons!: Pokemon[] | undefined

  ngOnInit(): void {
    this.pokemons = this.profile.Pokemons
    this.pokemons?.forEach((pokemon: Pokemon)=>{
      pokemon.types.forEach(type => {
        this.pokemonService.getType(type.type.url).subscribe((color)=>this.types[pokemon.id] = color)
        
      });
    })
  }

  editPokemons(){
    this.pokemonService.editPokemon.next(true)
  }


}
