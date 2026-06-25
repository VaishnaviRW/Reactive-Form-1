import { Component } from '@angular/core';
import { EmailValidator, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from './const/validatersPattern';
import { empIdValidator } from './validators/validators';
import { COUNTRIES_META_DATA } from './const/country';
import { Icountry } from './models/country';
import { emailIdValidator } from './validators/emailIdValidator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Reactive-Form-1';
  signUpForm !: FormGroup
  gendersArr = ['Male', 'Female', 'Others']
  countryArr: Icountry[] = COUNTRIES_META_DATA

  constructor() { }

  ngOnInit(): void {
    this.createsignUpForm()
    this.isAddSameHandler()
    this.permanentAddressHandler()
    this.onSkillAdd()
    this.addDependent()
    this.setConfirmPasswordState()
    this.confirmPasswordErrorHandler()
   
  }

  confirmPasswordErrorHandler(){
      this.f['confirmPassword'].valueChanges
    .subscribe( (confirmPassVal: any) => {
      let passVal = this.f['password'].value
      if(passVal === confirmPassVal){
        this.f['confirmPassword'].setErrors(null)
      }else{
         this.f['confirmPassword'].setErrors({
          passMissMatch : `Value of password and confirm password should be same`
         })
      }
    })
  }

  userDetails = {
    userName: "Vaishnavi W",
    email: "Vaishnavi23@gmail.com",
    empId: "A123",
    gender: "Feale",
    currentAddress: {
        country: "India",
        state: "Maharashtra",
        city: "Latur",
        pincode: "413512"
    },
    permanentAddress: {
        country: "India",
        state: "Maharashtra",
        city: "Latur",
        pincode: "413512"
    },
    isAddSame: true,
    skills: [
        "html",
        "CSS",
        "JavaScript"
    ],
    dependents: [
        {
            fullName: "Vaishnavi Wadgaokar",
            citizenship: "India",
            relationship: "Sister",
            isTravellingWithYou: true
        },
         {
            fullName: "Vaibhavi Wadgaonkar",
            citizenship: "India",
            relationship: "Sister",
            isTravellingWithYou: true
        }
    ],
    password: "S@ke4uuuu",
    confirmPassword: "S@ke4uuuu"
}

  setConfirmPasswordState(){
     this.f['password'].valueChanges
    .subscribe( (val: any) => {
      if(this.f['password'].valid){
        this.f['confirmPassword'].enable()
      }else{
         this.f['confirmPassword'].disable()
          this.f['confirmPassword'].reset() 
      }
    })
  }

  isAddSameHandler() {
    this.f['currentAddress'].valueChanges
      .subscribe((res: any) => {
        if (this.f['currentAddress'].valid) {
          this.f['isAddSame'].enable()
        } else {
          this.f['isAddSame'].disable()
          this.f['isAddSame'].reset()
        }
      })
  }

  permanentAddressHandler(){
     this.f['isAddSame'].valueChanges
      .subscribe((val: any) => {
        if (val) {
          let currAdd = this.f['currentAddress'].value
          this.f['permanentAddress'].patchValue(currAdd)
          this.f['permanentAddress'].disable()
        } else {
          this.f['permanentAddress'].reset()
          this.f['permanentAddress'].enable()
        }
      })
  }

  createsignUpForm() {
    this.signUpForm = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
        Validators.pattern(CustomRegex.onlyText),
        Validators.minLength(5),
        Validators.maxLength(25)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(CustomRegex.email)
      ],  [emailIdValidator.isEmailExist]),
      empId: new FormControl(null, [
        Validators.required, empIdValidator.isEmpIdValid
      ]
    ),
      gender: new FormControl("Female"),
      currentAddress: new FormGroup({
        country: new FormControl('India'),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        pincode: new FormControl(null, [Validators.required])
      }),
      permanentAddress: new FormGroup({
        country: new FormControl('India'),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        pincode: new FormControl(null, [Validators.required])
      }),
      isAddSame: new FormControl({ value: false, disabled: true }),
      skills: new FormArray([]),
      dependents : new FormArray([]),
      password : new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password)]),
      confirmPassword : new FormControl({value: null, disabled : true})
    })
  }

  get userName() {
    return this.signUpForm.get('userName') as FormControl
  }

  onAdd() {
    console.log(this.signUpForm);
    console.log(this.signUpForm.value);
    console.log(this.signUpForm.getRawValue());
    if(this.signUpForm.invalid){
      this.signUpForm.markAllAsTouched()
      return
    }else{
      this.signUpForm.reset()
    }
  }

  onEdit(){
    this.signUpForm.patchValue(this.userDetails)
    this.skillsArr.clear()
    this.userDetails.skills.forEach( s => {
      let control = new FormControl (s)
      this.skillsArr.push(control)
    })

    this.dependentsArr.clear()
    this.userDetails.dependents.forEach( dep => {
      let depGroup = new FormGroup({
        fullName : new FormControl(dep.fullName),
        citizenship : new FormControl(dep.citizenship),
        relationship : new FormControl(dep.relationship),
        isTravellingWithYou : new FormControl(dep.isTravellingWithYou)
      })
      this.dependentsArr.push(depGroup)
    })
  }

  get f() {
    return this.signUpForm.controls
  }

  get skillsArr() {
    return this.signUpForm.get('skills') as FormArray
  }

   get dependentsArr() {
    return this.signUpForm.get('dependents') as FormArray
  }

  onSkillAdd() {
    if (this.skillsArr.valid && this.skillsArr.length < 5) {
      let skillControl = new FormControl(null, Validators.required)
      this.skillsArr.push(skillControl)
    }
  }

  onSkillRemove(i : number){
    this.skillsArr.removeAt(i)
  }

  addDependent(){
   if(this.dependentsArr.valid && this.dependentsArr.length < 3){
     let dependent = new FormGroup({
        fullName : new FormControl(null, Validators.required),
        citizenship : new FormControl('India', Validators.required),
        relationship : new FormControl(null, Validators.required),
        isTravellingWithYou : new FormControl(true, Validators.required)
    })
    this.dependentsArr.push(dependent)
   }
    
  }

  onDepenRemove(i: number){
    this.dependentsArr.removeAt(i)
  }

}
