import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  //Atributes
  details:any;//Variable to save the details
  
  //Constructor
  constructor(private fileService:FileService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, folder: string, name:string }) {
    this.getDetails(this.data.id);
  }

  //Methods
  ngOnInit(){
  }

  getDetails(id:number){
    //Method to get the details of a specific file by its id
    this.fileService.getDetails(id).subscribe(
      resp => {
        this.details = resp;
      }
    )
  }
}
