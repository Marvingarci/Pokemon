import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { Generation, MainRegion } from 'src/app/models/Generation';
import { Pokemon } from 'src/app/models/Pokemon';
import { PokemondbService } from 'src/app/services/pokemondb.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  ready: boolean = false
  blockOthers: boolean = false
  pokemons$! : Observable<any>
  allPokemons: Pokemon[] = []
  selectedPokemons: number[] = []
  generation1: MainRegion[] = []
  constructor(private pokemonService: PokemondbService, private cdr: ChangeDetectorRef) {
    this.pokemonService.getFirstGenerationPokemons().
    pipe(
      map((gen1:Generation)=> gen1.pokemon_species)
    )
    .subscribe((pokemons: MainRegion[])=>{
      this.generation1 = pokemons.sort((a: MainRegion, b: MainRegion) => this.getPokemonIdfromUrl(a.url) - this.getPokemonIdfromUrl(b.url));
      this.generation1.forEach((poke, index) =>{
        poke.url = poke.url.replace("-species", "")
        // poke.pokemon$ = this.pokemonService.getPokemonInformation(poke.url)
        this.pokemonService.getPokemonInformation(poke.url).subscribe(
          (pokemon: Pokemon) =>{
            this.allPokemons.push(pokemon)
            poke.pokemon = pokemon
          }
        )
        // if (index === pokemons.length - 1){ 
        //   this.ready = true
        //   // this.allPokemons = pokemons
        // }
      })

    })

   }

  ngOnInit(): void {
  }
  createTeam(idPokemon: any){
    if(this.selectedPokemons.length < 3 && !this.selectedPokemons.find((e)=> e ==idPokemon)){
      this.selectedPokemons.push(idPokemon)
    }else if(this.selectedPokemons.length == 3){
      this.blockOthers = false
    }
  }
  getPokemonIdfromUrl(url: string):number{
    return parseInt(((url.split("pokemon-species/"))[1]).replace("/", ""))
  }

}
