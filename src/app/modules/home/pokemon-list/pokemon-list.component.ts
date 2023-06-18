import {  Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, pipe, Subscription, switchMap } from 'rxjs';
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
export class PokemonListComponent implements OnInit, OnDestroy {
  ready: boolean = false
  search: string=''
  blockOthers: boolean = false
  pokemons$! : Observable<any>
  selectedPokemons: Pokemon[] = []
  generation1: MainRegion[] = []
  observables: Subscription[]= []
  constructor(
    private pokemonService: PokemondbService, 
    private principalService: PrincipalService,
    private router: Router
  ) {
    let subs = this.pokemonService.getFirstGenerationPokemons().
    pipe(
      map((gen1:Generation)=> gen1.pokemon_species)
    )
    .subscribe((pokemons: MainRegion[])=>{
      this.generation1 = pokemons.sort((a: MainRegion, b: MainRegion) => this.getPokemonIdfromUrl(a.url) - this.getPokemonIdfromUrl(b.url));
      this.generation1.forEach((poke, index) =>{
        poke.url = poke.url.replace("-species", "")
        this.pokemonService.getPokemonInformation(poke.url).subscribe(
          (pokemon: Pokemon) =>{
            poke.pokemon = pokemon
          }
        )
      })
    })

    this.observables.push(subs)
   }

  ngOnInit(): void {

  }
  createTeam(Pokemon: Pokemon){

    if(!!this.selectedPokemons.find((e: Pokemon)=> e.id ==Pokemon.id)){
      this.selectedPokemons = this.selectedPokemons.filter((e: Pokemon) => e.id != Pokemon.id)
      let found = this.generation1.find((poke: MainRegion)=> poke.pokemon.id == Pokemon.id) as MainRegion
      found.pokemon.selected = false
      this.generation1 = this.generation1.filter((poke: MainRegion)=> poke.pokemon.id != Pokemon.id)
      this.generation1.splice(found.pokemon.id - 1, 0, found)

    }else if(this.selectedPokemons.length < 3){
      if(!this.selectedPokemons.find((e: Pokemon)=> e.id ==Pokemon.id)){
        this.selectedPokemons.push(Pokemon);
        let found = this.generation1.find((poke: MainRegion)=> poke.pokemon.id == Pokemon.id) as MainRegion
        found.pokemon.selected = true
        this.generation1 = this.generation1.filter((poke: MainRegion)=> poke.pokemon.id != Pokemon.id)
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

  savePokemons(){
    if(this.selectedPokemons.length < 3){
      return
    }
    console.log(this.selectedPokemons)
    let id: number;
    const subs = this.principalService.actualProfile$.pipe(
      switchMap((profile: Profile)=>{
        let profileToUpdate = profile
        id = profileToUpdate.id
        profileToUpdate.Pokemons = this.selectedPokemons
        return this.pokemonService.updateProfile(profileToUpdate, id)
      })
    ).subscribe((data)=>{
      this.pokemonService.editPokemon.next(false)
      this.router.navigate(['home/show/'+id])
      console.log(data)
      subs.unsubscribe
    })


  }

  ngOnDestroy(): void {
      this.observables.forEach((obs) => obs.unsubscribe)
  }

}
