import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { every, map, Observable, of, switchMap } from 'rxjs';
import { Profile } from '../models/profile';
import { environment } from 'src/environments/environment'
import { Generation, MainRegion } from '../models/Generation';
import { Pokemon } from '../models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemondbService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Profile>{
    return this.http.get<Profile>(environment.API_ENDPOINT+"profile")
  }
  saveProfile(profile: Profile){
    return this.http.post(environment.API_ENDPOINT+"profiles", profile)
  }

  getFirstGenerationPokemons(): Observable<Generation>{
    return this.http.get<Generation>('https://pokeapi.co/api/v2/generation/1')
  }

  getPokemonInformation(url: string):Observable<Pokemon>{
    return this.http.get<Pokemon>(url)
  }


  



}
