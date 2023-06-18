import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Profile } from '../models/profile';
import { PokemondbService } from '../services/pokemondb.service';

@Injectable({
  providedIn: 'root'
})
export class ShowprofileResolver implements Resolve<Observable<Profile>> {
  constructor(private pokemonService: PokemondbService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile> {
    return this.pokemonService.getProfileById(route.params['id'])
  }
}
