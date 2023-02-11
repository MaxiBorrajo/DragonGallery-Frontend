import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorter'
})
export class ShorterPipe implements PipeTransform {

  //Methods
  transform(value: string, args?: any): string {
    //Method to shorten "value" and then return it
    if(value.length > 20){
      return value.substring(0,21) + '...';
    }else{
      return value;
    }
  }

}
