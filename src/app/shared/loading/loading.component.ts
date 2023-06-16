import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="absolute flex flex-col top-1/3 left-1/3 ">
      <img class="w-[500px] " src="../assets/Loading-Pokemon.gif" alt="" >
      <span class="text-3xl font-bold text-darkBlue -pt-4  text-center">Cargando...</span>
    </div>
  `,
  styles: [
  ]
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
