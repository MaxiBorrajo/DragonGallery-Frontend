import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Folder service management
export class FoldersService {

  //Atributes
  url: string = 'https://dragongallery-backend-production.up.railway.app/folder'//API URL
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  //Constructor
  constructor(private http: HttpClient) { }

  //Methods
  public getAllFolders(): Observable<any> {
    //Method to get all the folders in the database
    return this.http.get<any>(this.url + '/allFolders');
  }

  public getFolderById(id:number): Observable<any> {
    //Method to get a specific folder by its id
    return this.http.get<any>(this.url + '/getFolder?id=' + id);
  }

  public getFolderByName(name:string): Observable<any> {
    //Method to get a specific folder by its name
    return this.http.get<any>(this.url + '/getFolder/' + name);
  }

  public getFilesOfFolderById(id:number): Observable<any> {
    //Method to get all the files related to a specific folder by its id
    return this.http.get<any>(this.url + '/getFilesOfFolder?id=' + id);
  }

  public getFilesOfFolderByName(name:string): Observable<any> {
    //Method to get all the files related to a specific folder by its name
    return this.http.get<any>(this.url + '/getFilesOfFolder/' + name);
  }

  public saveFolder(carpeta:any): Observable<any> {
    //Method to create a new folder and save it the database
    return this.http.post<any>(this.url + '/create', carpeta);
  }

  public rename(folder:any, name:string){
    //Method to change the name of a specific folder
    //"folder" is the folder to edit
    //"name" is the new name of the given folder
    return this.http.post<any>(this.url + '/rename?name=' + name, folder, this.httpOptions);
  }

  public deleteFolderById(id: number): Observable<any> {
    //Method to delete a specific folder by its id
    return this.http.delete<any>(this.url + "/delete?id=" + id);
  }

  public deleteFolderByName(name:string): Observable<any> {
    //Method to delete a specific folder by its name
    return this.http.delete<any>(this.url + "/delete/" + name);
  }
}
