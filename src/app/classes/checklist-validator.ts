import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ChecklistValidator {
     static hasSpaces(control: AbstractControl): ValidationErrors | null{
          const val = control.value as string;
          if(val.trim() === "") return {hasSpaces: true};
          return null
     }
}
