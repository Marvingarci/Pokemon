import { E } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, Observable, pipe, switchMap } from 'rxjs';
import { Generation, MainRegion } from 'src/app/models/Generation';
import { Pokemon } from 'src/app/models/Pokemon';
import { Profile } from 'src/app/models/profile';
import { PokemondbService } from 'src/app/services/pokemondb.service';
import { PrincipalService } from 'src/app/services/principal.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  ready: boolean = false
  search: string=''
  blockOthers: boolean = false
  pokemons$! : Observable<any>
  allPokemons: Pokemon[] = []
  selectedPokemons: number[] = []
  generation1: MainRegion[] = []
  constructor(
    private pokemonService: PokemondbService, 
    private principalService: PrincipalService
  ) {
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

    if(!!this.selectedPokemons.find((e)=> e ==idPokemon)){
      this.selectedPokemons = this.selectedPokemons.filter(e => e!= idPokemon)
      let found = this.generation1.find((poke: MainRegion)=> poke.pokemon.id == idPokemon) as MainRegion
      found.pokemon.selected = false
      this.generation1 = this.generation1.filter((poke: MainRegion)=> poke.pokemon.id != idPokemon)
      this.generation1.splice(found.pokemon.id - 1, 0, found)

    }else if(this.selectedPokemons.length < 3){

      if(!this.selectedPokemons.find((e)=> e ==idPokemon)){
        this.selectedPokemons.push(idPokemon);
        let found = this.generation1.find((poke: MainRegion)=> poke.pokemon.id == idPokemon) as MainRegion
        found.pokemon.selected = true
        this.generation1 = this.generation1.filter((poke: MainRegion)=> poke.pokemon.id != idPokemon)
        this.generation1.splice(this.selectedPokemons.length - 1, 0, found)
      }
      this.search = ""
    }
    if(this.selectedPokemons.length == 3){
      this.blockOthers = true
    }else{
      this.blockOthers = false
    }

    console.log(this.selectedPokemons)
  }
  getPokemonIdfromUrl(url: string):number{
    return parseInt(((url.split("pokemon-species/"))[1]).replace("/", ""))
  }

  savePokemons():void{
    console.log(this.selectedPokemons)

    this.principalService.actualProfile$.pipe(
      switchMap((profile: Profile)=>{
        let profileToUpdate = profile
        profileToUpdate.Pokemons = this.selectedPokemons
        return this.pokemonService.updateProfile(profileToUpdate, profileToUpdate.id)
      })
    ).subscribe((data)=>{
      console.log(data)
    })

  }


}
