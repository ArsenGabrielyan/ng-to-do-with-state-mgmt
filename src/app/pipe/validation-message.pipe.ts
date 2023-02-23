import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validationMessage'
})
export class ValidationMessagePipe implements PipeTransform {
  transform(value: any):string{
    if(!value) return ""
    if(value.required) return "Don't Leave This Blank"
    if(value.hasSpaces) return "Remove Any Spaces"
    return ""
  }
}
