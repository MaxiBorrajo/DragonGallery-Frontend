import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoldersService } from 'src/app/services/folders.service';
import { FileService } from 'src/app/services/file.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PreviewComponent {

  //Atributes
  files: any[] = [];//The files to use in the slides

  //Constructor
  constructor(private fileService: FileService, @Inject(MAT_DIALOG_DATA) public data: { start: number, folder: string },
    private folderService: FoldersService) { }

  //Methods
  ngOnInit() {
    this.getFilesByFolderName(this.data.folder);
  }

  getFiles() {
    //Method to get all the files in the database
    this.fileService.getFiles().subscribe(data => {
      this.files = data;
    });
  }

  getFilesByFolderName(name: string) {
    //Method to get all the files of a folder by its name
    if (name == 'allPhotos') {
      this.getFiles();
    } else {
      this.folderService.getFolderByName(name).subscribe(
        resp => {
          let carpeta = resp;
          this.folderService.getFilesOfFolderById(carpeta.id).subscribe(
            imgs => {
              this.files = imgs;
            }
          )
        }
      )
    }
  }

}
