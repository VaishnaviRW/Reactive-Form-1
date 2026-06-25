import { Call } from "@angular/compiler";
import { AbstractControl, ValidationErrors } from "@angular/forms";

export class empIdValidator {
    static isEmpIdValid(control : AbstractControl): null | ValidationErrors{
        let val = control.value as string;
      if(!val){
        return null
      }

      let regExp = /^[A-Z]\d{3}$/;
      let isValid = regExp.test(val)

      if(isValid){
        return null
      }else{
        return {
            invalidEmpId : `EmpId must be start with Capital Alphabet and end with 3 numbers`
        }
      }
    }
}