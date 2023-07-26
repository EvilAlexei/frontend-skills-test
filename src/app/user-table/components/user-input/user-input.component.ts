import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInputComponent {
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, onlyLettersValidator()]),
  });

  constructor(
    private userService: UserService,
  ) {}

  addUser(): void {
    const userName = this.userForm.value.name;

    if (userName && userName.trim() && isNaN(+userName)) {
      this.userService.addUser(userName);
      this.userForm.reset();
    }
  }

  integrateUsers(): void {
    this.userService.integrateUsers();
  }
}

export function onlyLettersValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const isOnlyText = !/^[a-zA-Z]*$/g.test(value);

    return isOnlyText ? { isOnlyLetters: true } : null;
  }
}

