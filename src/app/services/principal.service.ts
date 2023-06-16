import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  isLoading$  = new BehaviorSubject<boolean>(false)
  constructor() { }
}
