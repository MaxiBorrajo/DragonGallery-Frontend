import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  //Atributes
  private event = new BehaviorSubject<any>("");//Subject to handle and send data between separated components

  //Constructor
  constructor() { }

  //Methods
  sendEvent(object: any){
    //Method to send "object" to the observables
    this.event.next(object);
  }

  getEvent(): Observable<any> {
    //Method that returns "event" as an observable 
    return this.event.asObservable();
  }
}
