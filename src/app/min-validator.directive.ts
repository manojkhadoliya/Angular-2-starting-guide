import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[min]',
  // register validator in DI
  providers: [{ provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true }]
})
export class MinValidatorDirective implements Validator {
  @Input() min: number;
  constructor() { }
  validate(control: AbstractControl): ValidationErrors {

    const isValid = control.value >= this.min;

    return isValid ? null : {
      min: {
        isValid: false
      }
    }
  }
}
