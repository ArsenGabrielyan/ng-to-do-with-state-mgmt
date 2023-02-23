import { ElementRef, Pipe, PipeTransform, ViewChild } from '@angular/core';

@Pipe({
  name: 'validationMessage'
})
export class ValidationMessagePipe implements PipeTransform {
  transform(value: any):string{
    if(!value) return ""
    if(value.required) return "Required"
    if(value.hasSpaces) return "Remove Any Spaces"
    return ""
  }
}
