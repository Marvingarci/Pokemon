import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <main class="flex h-24 w-full justify-between px-3 shadow-md" >
      <img class="w-98" src="../assets/Pokemon-Logo.png" alt="" >
      <div class="flex items-center space-x-1 rounded-lg border border-darkBlue px-14 py-2 my-auto">
       <span class="text-darkBlue font-bold text-base">{{name}}</span> 
        <svg class="h-5 w-5 text-darkBlue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </main>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  @Input() name: string = 'Marvin'
  constructor() { }

  ngOnInit(): void {
  }

}
