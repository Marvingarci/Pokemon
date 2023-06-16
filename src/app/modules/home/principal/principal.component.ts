import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrincipalService } from 'src/app/services/principal.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  showLoading!: BehaviorSubject<boolean>;
  
  constructor(private principalService: PrincipalService) { 
    this.showLoading = this.principalService.isLoading$
  }

  ngOnInit(): void {

  }

}
