import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { PrincipalService } from 'src/app/services/principal.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  showLoading!: BehaviorSubject<boolean>;
  profile$! : Observable<Profile> 
  
  constructor(private principalService: PrincipalService) { 
    this.showLoading = this.principalService.isLoading$
    this.profile$ = this.principalService.actualProfile$
  }

  ngOnInit(): void {
  }

}
