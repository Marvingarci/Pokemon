import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Stat } from 'src/app/models/Pokemon';
import { STATS } from 'src/app/modules/home/pokemon-show/stats';
import { PokemondbService } from 'src/app/services/pokemondb.service';

@Component({
  selector: 'app-progress',
  template: `
  <div class="flex my-2 justify-between">
    <span class="text- text-xl">{{ conf[stat.stat.name].nameEs}}</span>
    <div class="rounded-xl h-4 w-36 md:w-40 lg:w-40  flex border-4 border-white shadow-lg">
      <div *ngIf="(color$ | async) as color" [ngStyle]="{'width': ((stat.base_stat/conf[stat.stat.name].max)*100)+'%'}" [ngClass]="{'bg-red-300' : true}"  class="bg-pink-300 rounded-xl"></div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class ProgressComponent implements OnInit {
  conf = STATS
  color$! : Observable<any>
  constructor(
    private pokemonService: PokemondbService
  ) {

   }
  @Input() stat!: Stat
  @Input() id!: number
  ngOnInit(): void {

    // console.log(this.stat.stat.name+": "+(this.stat.base_stat/this.conf[this.stat.stat.name].max)*100)
     this.color$ =  this.pokemonService.getPokemonColor(this.id).pipe(map((sta)=> sta.color.name))
  }

}
