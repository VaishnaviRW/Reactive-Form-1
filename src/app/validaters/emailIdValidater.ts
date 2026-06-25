import { AbstractControl, ValidationErrors } from "@angular/forms";

export class emailIdValidator {
  static  isEmailExist(control : AbstractControl): Promise<ValidationErrors | null>{
        let val = control.value as string

        const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
            setTimeout(() => {
                if(val === 'jhon@gmail.com'){
                    resolve({
                        emialIdExit : `This email id is already in use`
                    })
                }else{
                    resolve(null)
                    }
            }, 2000);
        })

        return promise  
    }
}

