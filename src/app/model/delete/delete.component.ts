import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { FoldersService } from 'src/app/services/folders.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  //Constructor
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number, object: string, object_name: string },
    private fileService: FileService, private folderService: FoldersService,
    private eventService: EventEmitterService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar) {

  }

  //Methods
  delete() {
    //Method to delete the given file
    this.spinner.show("delete-spinner");
    if (this.data.object == "folder") {
      this.folderService.deleteFolderById(this.data.id).subscribe(
        resp => {
          console.log(resp);
          this.eventService.sendEvent("folder-delete");
        }
      )
    } else {
      this.fileService.delete(this.data.id).subscribe(
        resp => {
          console.log(resp);
          this.eventService.sendEvent("file-delete");
        }
      )
    }
  }
}
