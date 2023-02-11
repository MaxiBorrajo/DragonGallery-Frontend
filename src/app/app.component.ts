import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Atributos
  title = 'Dragon Gallery'; //Title of the web
  valueSearched!:string;//Value of the actual search

  //Methods
  onSearch(value:string){
    /*Method that functions as communicator between
    what is being search in the NavbarComponent*/
    this.valueSearched = value;
  }
}
