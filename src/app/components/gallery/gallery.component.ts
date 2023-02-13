import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { DeleteComponent } from 'src/app/model/delete/delete.component';
import { RenameComponent } from 'src/app/model/rename/rename.component';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { FoldersService } from 'src/app/services/folders.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {

  //Atributes
  @Input() valueSearched!: string;//Variable that saves the value searched from the search bar
  files: any[] = [];//Variable that saves the files got from the database
  folders: any[] = [];//Variable that saves the folders
  new: boolean = false;//Boolean that open or close to create a new folder
  selectDashboard: boolean = false;//Boolean that indicates to open or close the select dashboard
  folderForm!: FormGroup;//Form to create a new folder
  activedFolder: string = "allPhotos";//String that saves which is the current folder, by default is "allPhotos"
  eventSubscription!: Subscription;//Variable that saves a subscription
  p!: number;//Variable used in pagination
  @Input() allSelected: boolean = false;//Boolean that indicates if all files are selected

  //Constructor
  constructor(private fileService: FileService,
    private folderService: FoldersService, private formBuilder: FormBuilder,
    private dialog: MatDialog, private eventService: EventEmitterService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar) {
    this.folderForm = formBuilder.group({
      name: new FormControl('', Validators.required)
    })
  }

  //Method
  ngOnInit() {
    this.getFiles();
    this.getFolders();
    this.eventSubscription = this.eventService.getEvent().subscribe(
      resp => {
        if (resp == "folder-delete") {
          this.spinner.hide("delete-spinner");
          this._snackBar.open("Delete Succesful", "Ok", {
            duration: 3000
          });
          this.getFolders();
          this.activedFolder = "allPhotos";
          this.getFilesByFolderName(this.activedFolder);
        } else if (resp == "file-delete") {
          this.spinner.hide("delete-spinner");
          this._snackBar.open("Deleted Succesfully", "Ok", {
            duration: 3000
          });
          this.getFilesByFolderName(this.activedFolder);
        } else if (resp == "folder-rename") {
          this.getFolders();
        } else if (resp == "file-rename") {
          this.getFilesByFolderName(this.activedFolder);
        }
      }
    );

  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  getFiles() {
    //Method to get all the files in the database
    this.fileService.getFiles().subscribe(data => {
      this.files = data;
    });
  }

  getFilesByFolderName(name: string) {
    //Method to get all the files of a specific folder by its name
    if (name == 'allPhotos') {
      this.getFiles();
    } else {
      this.folderService.getFilesOfFolderByName(name).subscribe(
        resp => { this.files = resp }
      )
    }
  }

  getFolders() {
    //Method to get all the folders
    this.folderService.getAllFolders().subscribe(data => {
      this.folders = data;
    })
  }

  onNew() {
    //Method to open or close a section that allows to create a new folder
    this.new = !this.new
  }

  createNewFolder() {
    //Method to create a new folder
    this.folderService.saveFolder(this.folderForm.value).subscribe(data => {
      console.log(data);
      this.getFolders();
      this.onNew();
    })
  }

  changeFolder(folder: string) {
    //Method to change the current folder
    this.activedFolder = folder;
    this.getFilesByFolderName(folder);
  }

  renameFolder(id_folder: number, name: string) {
    //Open rename dialog
    this.dialog.open(RenameComponent, {
      data: {
        id: id_folder,
        object: "folder",
        object_name: name
      }
    })
  }

  deleteFolder(id_folder: number, name: string) {
    //Open delete dialog
    this.dialog.open(DeleteComponent, {
      data: {
        id: id_folder,
        object: "folder",
        object_name: name
      }
    })
  }

  openDashboard() {
    //Method to open or close select dashboard
    this.selectDashboard = !this.selectDashboard;
  }

  selectAll() {
    //Method to select all the files
    this.allSelected = !this.allSelected
  }

  moveFiles(id_folder: number) {
    //Method to moves all the files selected
    this.eventService.sendEvent({
      "event": "move-file",
      "folder": id_folder
    })
  }

  deleteFiles() {
    //Method to delete all the files selected
    this.eventService.sendEvent("delete-file")
  }

  drop(event: CdkDragDrop<any>) {
    //Method that allows to drop out
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
  }
}
