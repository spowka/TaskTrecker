import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import CustomValidators from 'src/app/shared/validators';

@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.scss']
})
export class UserInviteComponent implements OnInit {
  form: FormGroup;
  triedToSubmit = false;
  sending = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      invitationType: new FormControl('', Validators.required),
      emails: new FormArray([
        new FormControl('', Validators.email)
      ], [CustomValidators.hasItem])
    });
  }

  hasError (path: string, error: string = null): boolean {
    const errors = this.form.get(path).errors;

    if (errors) {
      return !error || !!errors;
    }

    return false;
  }

  getFormArray (path: string): AbstractControl[] {
    return (<FormArray>this.form.get(path)).controls;
  }

  getStatus (path: string): string {
    const item = this.form.get(path);

    if (!item.dirty && item.untouched || !item.value) {
      return 'untouched';
    }

    if (item.errors) {
      return 'error';
    }

    return 'valid';
  }

  onInput (last: boolean) {
    if (last) {
      (<FormArray>this.form.get('emails')).push(new FormControl('', Validators.email));
    }
  }

  onClose() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit () {
    this.triedToSubmit = true;

    if (this.form.valid) {
      this.sending = true;

      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      })
      .then(() => {
        this.sending = false;
        this.onClose();
      });
    }
  }
}
