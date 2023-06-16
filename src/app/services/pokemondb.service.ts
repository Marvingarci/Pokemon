import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { environment } from 'src/environments/environment'

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



}
