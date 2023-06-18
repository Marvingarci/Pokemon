import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { PokemondbService } from 'src/app/services/pokemondb.service';
import { PrincipalService } from 'src/app/services/principal.service';

@Component({
  selector: 'app-header',
  template: `
    <main class="flex h-24 w-full justify-between px-3 shadow-md" >
      <img class="w-98" src="../assets/Pokemon-Logo.png" alt="" >
      <div class="flex items-center space-x-1 rounded-lg border border-darkBlue px-14 py-2 my-auto">
      <button  mat-button [matMenuTriggerFor]="menu">{{name}}</button>
      
      <mat-menu #menu="matMenu">
        <button *ngFor="let prof of profile" (click)="goToProfile(prof.id, prof.name)" mat-menu-item>{{prof.name}}</button>
      </mat-menu>
      
        <svg mat-button [matMenuTriggerFor]="menu" class="h-5 w-5 text-darkBlue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </main>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  @Input() name: string = 'Usuario'
  profile! : Profile[]
  constructor(
    private pokemonService: PokemondbService, 
    private router: Router, 
  ) {
    this.pokemonService.getProfile().subscribe((a: Profile[]) =>{
      this.profile = a
    })

   }

  ngOnInit(): void {
    // this.profile$ = this.pokemonService.getProfile()   
  }

  goToProfile(id: number, name: string){
    this.name = name
    this.router.navigate(['home/show/'+id])
  }

}
