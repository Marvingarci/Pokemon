import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../models/profile';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})


export class PrincipalService {
  initProfile: Profile ={
    name:"",
    hobbie:"",
    birthday: "",
    img: "",
    DNI: ""
  }
  isLoading$  = new BehaviorSubject<boolean>(false)
  imageChange$  = new BehaviorSubject<string>('')
  actualProfile$  = new BehaviorSubject<Profile>(this.initProfile)
  constructor() { }

  getAge(birthDay:string): number{
    let years:number = moment().diff(birthDay, 'years',false);
    return years
  }
}
