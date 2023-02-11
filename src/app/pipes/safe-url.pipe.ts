import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeURL'
})
export class SafeURLPipe implements PipeTransform {

  //Constructor
  constructor(private sanitizer:DomSanitizer){
  }

  //Methods
  transform(value: any, args?: any): any {
    //Method to make trusty a url given by "value"
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }

}
