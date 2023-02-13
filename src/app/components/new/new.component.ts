import { ContentObserver } from '@angular/cdk/observers';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {

  //Atributes
  @ViewChild('inputfile')
  inputFile!: ElementRef; //References a input type file in the HTML file
  @Input() activedFolder!: string; //Variable that indicates the activated folder
  @Output() uploadEvent = new EventEmitter<any>(); //Variable to send an event to the parent component
  selectedImages: any[] = [];//Images that are going to be uploaded
  selectedVideos: any[] = [];//Videos that are going to be uploaded
  images: any[] = [];//Images that are going to be shown
  videos: any[] = [];//Videos that are going to be shown

  //Constructor
  constructor(private fileService: FileService,
    private spinner: NgxSpinnerService, private _snackBar: MatSnackBar) {
  }

  //Methods
  onUpload(): void {
    //Method to upload the selected videos or images
    for (let file of this.selectedImages) {
      this.spinner.show("upload-spinner");
      this.fileService.upload(file, this.activedFolder).subscribe(
        resp => {
          console.log(resp)
          this.spinner.hide("upload-spinner");
          this.uploadEvent.emit();
          this._snackBar.open("Uploaded Succesfully", "Ok", {
            duration: 3000
          });
        },
        err => {
          alert(err)
          this.spinner.hide("upload-spinner");
        })
    };
    for (let file of this.selectedVideos) {
      this.spinner.show("upload-spinner");
      this.fileService.upload(file, this.activedFolder).subscribe(
        resp => {
          console.log(resp)
          this.spinner.hide("upload-spinner");
          this.uploadEvent.emit();
          this._snackBar.open("Uploaded Succesfully", "Ok", {
            duration: 3000
          });
        },
        err => {
          alert(err)
          this.spinner.hide("upload-spinner");
        })
    };
    this.totalReset();
  }

  totalReset(): void {
    //Method to reset the videos and images selected, and also "inputFile"
    this.selectedImages = [];
    this.selectedVideos = [];
    this.images = [];
    this.videos = [];
    this.inputFile.nativeElement.value = "";
  }

  partialReset(): void {
    //Method to reset the videos and images selected
    this.selectedImages = [];
    this.selectedVideos = [];
    this.images = [];
    this.videos = [];
  }

  unSelectFile(i: number, type: string) {
    //Method to unselect an image or video of its respective lists
    if (type == "video") {
      this.videos.splice(i, 1);
      this.selectedVideos.splice(i, 1);
    } else {
      this.images.splice(i, 1);
      this.selectedImages.splice(i, 1);
    }
  }

  selectFile(event: any) {
    //Method to select videos o images
    if (this.images.length > 0 || this.videos.length > 0) {
      this.partialReset()
    }
    const validImageFileExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    const validVideoFileExtensions = ['video/mp4'];
    for (let file of event.target.files) {
      if (validImageFileExtensions.includes(file.type)) {
        this.selectedImages.push(file);
        var i = new Image();
        i.src = URL.createObjectURL(file);
        this.images.push(i);
      } else if (validVideoFileExtensions.includes(file.type)) {
        this.selectedVideos.push(file);
        this.videos.push(URL.createObjectURL(file));
      }
    }
  }

  previewImages() {
    //Method that returns an shorter version of "images"
    if (this.images.length > 8 && this.videos.length == 0) {
      return this.images.slice(0, 7);
    } else if (this.images.length > 4 && this.videos.length > 0) {
      return this.images.slice(0, 3);
    } else {
      return this.images
    }
  }

  previewVideos() {
    //Method that returns an shorter version of "videos"
    if (this.videos.length > 8 && this.images.length == 0) {
      return this.videos.slice(0, 7);
    } else if (this.videos.length > 4 && this.images.length > 0) {
      return this.videos.slice(0, 3);
    } else {
      return this.videos;
    }
  }

  inputHandler() {
    //Method to do click on "inputFile"
    this.inputFile.nativeElement.click();
  }

  droppedImage(event: any) {
    //Similar method to "onUpload", its activated when files are drop out
    event.preventDefault();
    let files = event.dataTransfer.files
    if (this.images.length > 0 || this.videos.length > 0) {
      this.partialReset
    }
    const validImageFileExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    const validVideoFileExtensions = ['video/mp4'];
    for (let file of files) {
      if (validImageFileExtensions.includes(file.type)) {
        var i = new Image();
        i.src = URL.createObjectURL(file);
        this.images.push(i);
      } else if (validVideoFileExtensions.includes(file.type)) {
        this.videos.push(URL.createObjectURL(file));
        console.log(this.videos.length)
      }
    }
  }

  allowDrop(event: any) {
    //Method that allows dropping
    event.preventDefault();
  }
}
