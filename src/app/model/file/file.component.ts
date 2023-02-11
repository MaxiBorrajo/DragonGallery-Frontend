import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { FoldersService } from 'src/app/services/folders.service';
import { FileService } from 'src/app/services/file.service';
import { DeleteComponent } from '../delete/delete.component';
import { DetailComponent } from '../detail/detail.component';
import { PreviewComponent } from '../preview/preview.component';
import { RenameComponent } from '../rename/rename.component';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {

  //Atributes
  eventSubscription!: Subscription;//Variable to save in memory a specific subscription
  folders: any[] = [];//Variable to save the folders

  //Inputs
  @Input() file!: any; //The specific file that it's being shown
  @Input() actualFolder!: string; //The actual folder that is currently active
  @Input() i!: number; //Index of the list that belongs the given file
  @Input() selectDashboard!: boolean;//Variable to communicate from parent to child if "select dashboard" it's open or not
  @Input() allSelected!: boolean;//Indicates if it's all selected in the "select dashboard"

  //Outputs
  @Output() updateEvent = new EventEmitter<any>();//To communicate to the parent to update the files
  @Output() openDashboardEvent = new EventEmitter<any>();//To communicate to the parent to open the "select dashboard"
  @ViewChild('checkbox') checkbox!: ElementRef;//Reference to a HTMLElement input type checkbox

  //Constructor
  constructor(private fileService: FileService, private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar, private dialog: MatDialog, private folderService: FoldersService,
    private eventService: EventEmitterService) {
  }

  //Methods
  ngOnInit() {
    this.getFolders();
    this.eventSubscription = this.eventService.getEvent().subscribe(
      resp => {
        if (resp == "delete-file" && this.checkbox.nativeElement.checked) {
          this.spinner.show("delete-spinner");
          this.fileService.delete(this.file.id).subscribe(
            data => {
              console.log(data);
              this.spinner.hide("delete-spinner");
              window.location.reload();
            }
          )
        }else if(resp.event == "move-file" && this.checkbox.nativeElement.checked){
          if (resp.folder != this.file.carpeta.id) {
            this.fileService.move(resp.folder, this.file).subscribe(
              resp => {
                console.log(resp);
                window.location.reload();
              }
            )
          }
        }
      }
    )
  }

  getFolders() {
    //Method to get all the folders
    this.folderService.getAllFolders().subscribe(data => {
      this.folders = data;
    })
  }

  openDetail(id: number, folder: string, name: string) {
    //Method to open detail dialog
    this.dialog.open(DetailComponent, {
      data: {
        id: id,
        folder: folder,
        name: name
      }
    });
  }

  openPreview() {
    //Method to open preview dialog
    console.log(this.file.carpeta)
    this.dialog.open(PreviewComponent, {
      height: '500px',
      width: '800px',
      data: {
        start: this.i,
        folder: this.actualFolder
      }
    });
  }

  renameFile(id_img: number, name: string) {
    //Method to open rename dialog
    this.dialog.open(RenameComponent, {
      data: {
        id: id_img,
        object: "file",
        object_name: name
      }
    })
  }

  deleteFile(id_img: number, name: string) {
    //Method to open delete dialog
    this.dialog.open(DeleteComponent, {
      data: {
        id: id_img,
        object: "file",
        object_name: name
      }
    })
  }

  move(id_folder: number, file: any) {
    //Method to move "file" to the folder with id "id_folder"
    if (id_folder != file.carpeta.id) {
      this.fileService.move(id_folder, file).subscribe(
        resp => {
          console.log(resp);
          this.updateEvent.emit();
          this._snackBar.open("Moved Succesfully", "Ok", {
            duration: 3000
          });
        }
      )
    }
  }

  downloadFile(url: string, filename: string) {
    //Method to download the file "filename" by its url "url"
    this.fileService.download(url).subscribe(
      blob => {
        saveAs(blob, filename);
        this._snackBar.open("Downloaded Succesfully", "Ok", {
          duration: 3000
        });
      }
    )
  };

  openSelectPanel() {
    //Method that emit an even to the parent to open the "select dashboard"
    this.openDashboardEvent.emit();
  }
}
