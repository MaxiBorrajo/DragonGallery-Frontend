import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { FoldersService } from 'src/app/services/folders.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-rename',
  templateUrl: './rename.component.html',
  styleUrls: ['./rename.component.css']
})
export class RenameComponent {

  //Atributes
  renameForm!: FormGroup;//Form to rename a folder or a file
  object: any;//Object to rename (Folder or File)

  //Constructor
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number, object: string, object_name: string },
    formBuilder: FormBuilder, private fileService: FileService, private folderService: FoldersService,
    private eventService: EventEmitterService) {

    this.renameForm = formBuilder.group({
      name: new FormControl(data.object_name, Validators.required)
    })

  }

  //Methods
  ngOnInit() {
    this.getObject()
  }

  getObject() {
    //Method to get to the specific object
    if (this.data.object == "folder") {
      this.folderService.getFolderByName(this.data.object_name).subscribe(
        resp => {
          this.object = resp;
        }
      )
    } else {
      this.fileService.getFile(this.data.id).subscribe(
        resp => {
          this.object = resp;
        }
      )
    }
  }

  rename() {
    //Method to rename the object
    if (this.data.object == "folder") {
      this.folderService.rename(this.object, this.renameForm.get("name")?.value).subscribe(
        resp => {
          console.log(resp);
          this.eventService.sendEvent("folder-rename");
        }
      )
    } else {
      this.fileService.rename(this.object, this.renameForm.get("name")?.value).subscribe(
        resp => {
          console.log(resp);
          this.eventService.sendEvent("file-rename");
        }
      )
    }

  }

}
