import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  //Atributes
  search = new FormControl(''); //Variable that contains what is being search
  @Output() valueSearched = new EventEmitter<any>();//To send "search" to the parent
  
  //Constructor
  constructor(private router:Router){
  }

  //Method
  ngOnInit(){
    this.search.valueChanges.pipe( // The pipe function receives RxJs operators that run in order
        debounceTime(1000), // Wait 1 second before issuing input value
        distinctUntilChanged() // Prevents the value from being issued if it is equal to the last value that was issued
    ).subscribe(val=>{
        this.valueSearched.emit(val);//Issues the value obtained
    })
  }

  reload(){
    //Method to reload the window
    window.location.reload();
  }
}
