import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  //Atributes
  url: string = 'http://localhost:8080/img'//API URL

  //Constructor
  constructor(private http: HttpClient) { }

  //Methods
  public getFiles(): Observable<any> {
    //Method to get all the files in the database regardless of which folder they are in
    return this.http.get<any>(this.url + '/getFiles');
  }

  public getFile(id:number): Observable<any> {
    //Method to get a specific file by its id
    return this.http.get<any>(this.url + '/getFile/' + id);
  }

  public upload(file: File, folder?: string | null): Observable<any> {
    //Method to upload a image or video into the database
    //"file" it's the given image or video to upload
    //"folder" where it will be upload "file" (Default Value = "allPhotos")
    const formData = new FormData();
    formData.append("multipartFile", file);
    if (folder != null) {
      return this.http.post<any>(this.url + '/upload?folder_name=' + folder, formData);
    } else {
      return this.http.post<any>(this.url + '/upload', formData);
    }
  }

  public delete(id: number): Observable<any> {
    //Method to delete a specific file by its id
    return this.http.delete<any>(this.url + "/delete/" + id);
  }

  public getDetails(id:number):Observable<any>{
    //Method to get details of a specific file by its id
    return this.http.get(this.url + '/getDetails/' + id, {responseType:'json'});
  }

  public rename(file:any, name:string): Observable<any>{
    //Method to change the name of a specific image or video
    //"file" is the file to edit
    //"name" is the new name of the given file
    return this.http.post<any>(this.url + '/rename?name=' + name, file);
  }

  public move(id_folder:number, file:any): Observable<any>{
    //Method to change the folder of a specific file
    //"id_folder" it's the id of the folder you want to move
    //"file" is the file you want to move
    return this.http.post<any>(this.url + '/move?id_folder=' + id_folder, file);
  }

  public download(src:string):Observable<Blob>{
    //Method to download a file
    //"src" is the url that corresponds to the file
    return this.http.get(src, { responseType: 'blob' });
  }
}
