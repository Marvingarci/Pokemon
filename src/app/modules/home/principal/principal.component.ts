import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { PokemondbService } from 'src/app/services/pokemondb.service';
import { PrincipalService } from 'src/app/services/principal.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  showLoading: Observable<boolean> = of(false);
  profile$! : Observable<Profile> 
  editPokemon$! : Observable<boolean> 
  profileEditing! : Profile
  showView: boolean = false
  editingProfile: boolean = false
  constructor(
    private pokemonService: PokemondbService,     
    private principalService: PrincipalService,     
    private router: Router,     
    private route: ActivatedRoute
    ) { 
    this.showLoading = this.principalService.isLoading$
    this.profile$ = this.principalService.actualProfile$
    this.pokemonService.editPokemon.subscribe((a)=>{
      this.showView = !a
    })
  }

  ngOnInit(): void {
    

    this.route.params.subscribe((params: Params) => {
      this.loadData()
    });
    
  }

  loadData(){
    if(this.route.snapshot.data['profile']){
      this.showView = true
      this.principalService.actualProfile$.next(this.route.snapshot.data['profile'])
      this.profileEditing = this.route.snapshot.data['profile'] 
      this.principalService.isLoading$.next(false)
    }
    if(this.route.snapshot.data['editProfile']){
      this.editingProfile = true
      this.profile$ = of(this.route.snapshot.data['editProfile'])
      this.profileEditing = this.route.snapshot.data['editProfile'] 
      this.principalService.isLoading$.next(false)
      // console.log(this.route.snapshot.data['editProfile'])
    }
  }

  editProfile(id: number){
    this.principalService.isLoading$.next(true)
    this.router.navigate(['home/edit-profile/'+id])
    this.pokemonService.editPokemon.next(true)
  }

}
