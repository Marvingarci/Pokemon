import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, every, map, Observable, of, switchMap } from 'rxjs';
import { Profile } from '../models/profile';
import { environment } from 'src/environments/environment'
import { Generation, MainRegion } from '../models/Generation';
import { Pokemon } from '../models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemondbService {
  editPokemon: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  constructor(private http: HttpClient) { }

  getProfile(): Observable<Profile[]>{
    return this.http.get<Profile[]>(environment.API_ENDPOINT+"profiles")
  }
  getProfileById(id: number): Observable<Profile>{
    return this.http.get<Profile>(environment.API_ENDPOINT+"profiles/"+id)
  }

  saveProfile(profile: Profile){
    return this.http.post(environment.API_ENDPOINT+"profiles", profile)
  }
  updateProfile(profile: Profile, id: number){
    return this.http.put(environment.API_ENDPOINT+"profiles/"+id, profile)
  }

  getFirstGenerationPokemons(): Observable<Generation>{
    return this.http.get<Generation>('https://pokeapi.co/api/v2/generation/1')
  }

  getPokemonInformation(url: string):Observable<Pokemon>{
    return this.http.get<Pokemon>(url)
  }

  getPokemonColor(id: number):Observable<any>{
    return this.http.get<any>("https://pokeapi.co/api/v2/pokemon-species/"+id)
  }

  getType(url: string): Observable<any>{
    return this.http.get<any>(url).pipe(map((response: any) => (response.names.find((e:any) => e.language.name == 'es')).name ))
  }
  


  



}
