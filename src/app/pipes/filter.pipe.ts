import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: string): any {
    //Method to filter "value" according to "arg". It is used to make a search
    if (arg == undefined || (arg != undefined && (arg == '' || arg.length < 3))) {
      return value;
    } else {
      const result = [];
      for (let arc of value) {
        if (arc.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          result.push(arc);
        }
      }
      if(result.length > 0){
        return result;
      }else{
        return "No file/s found"
      }
    }
  }

}
