import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StudentsService } from '../students.service';
import { StudentListModel } from '../student-models';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  form: FormGroup;
  editMode = false;
  studentID: string;
  students: StudentListModel[];
  genders: { value: string | number, text: string }[];
  countries: { value: string | number, text: string }[];
  emails: { value: string | number, text: string }[];
  phones: { value: string | number, text: string }[];

  constructor(
    public modalService: ModalService,
    public studentsService: StudentsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.genders = this.studentsService.genders;
    this.countries = this.studentsService.countries;
    this.emails = this.studentsService.emails;
    this.phones = this.studentsService.phones;
    this.students = this.studentsService.getStudents();
    this.studentID = this.route.snapshot.params['id'];
    this.route.params
    .subscribe(
      (params: Params) => {
        this.studentID = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    if (this.editMode) {
      const student = this.studentsService.getStudent(this.studentID);
      this.form = new FormGroup({
        'firstName': new FormControl(student.firstName, [Validators.required, Validators.maxLength(5)]),
        'middleName': new FormControl(student.middleName),
        'lastName': new FormControl(student.lastName, Validators.required),
        'gender': new FormControl(student.gender),
        'birthDay': new FormControl(student.birthDay),
        'studied': new FormGroup({
          'from': new FormControl(student.from),
          'to': new FormControl(student.to)
        }),
        'education': new FormArray([
          new FormGroup({
            'from': new FormControl(''),
            'to': new FormControl(''),
            'description': new FormControl('')
          })
        ]),
        'work': new FormArray([
          new FormGroup({
            'from': new FormControl(''),
            'to': new FormControl(''),
            'description': new FormControl('')
          })
        ]),
        'trainings': new FormArray([
          new FormGroup({
            'from': new FormControl(''),
            'to': new FormControl(''),
            'description': new FormControl('')
          })
        ]),
        'other': new FormArray([
          new FormGroup({
            'from': new FormControl(''),
            'to': new FormControl(''),
            'description': new FormControl('')
          })
        ]),
        'emails': new FormArray([
          new FormGroup({
            'type': new FormControl(''),
            'email': new FormControl(student.emails, [Validators.required, Validators.email])
          })
        ]),
        'facebook': new FormControl(student.facebook),
        'skype': new FormControl(student.skype),
        'phones': new FormArray([
          new FormGroup({
            'phone': new FormControl(student.phone)
          })
        ]),
        'address': new FormGroup({
          'country': new FormControl(student.country),
          'state': new FormControl(student.state),
          'city': new FormControl(student.city),
          'address1': new FormControl(student.address1),
          'address2': new FormControl(student.address2)
        })
      });

    } else {
      this.form = new FormGroup({
        'firstName': new FormControl('', Validators.required),
        'middleName': new FormControl(''),
        'lastName': new FormControl('', Validators.required),
        'gender': new FormControl(''),
        'birthDay': new FormControl(''),
        'studied': new FormGroup({
          'from': new FormControl(''),
          'to': new FormControl('')
        }),
        'education': new FormArray([
          new FormGroup({
            'from': new FormControl(''),
            'to': new FormControl(''),
            'description': new FormControl('')
          })
        ]),
        'work': new FormArray([
          new FormGroup({
            'from': new FormControl(''),
            'to': new FormControl(''),
            'description': new FormControl('')
          })
        ]),
        'trainings': new FormArray([
          new FormGroup({
            'from': new FormControl(''),
            'to': new FormControl(''),
            'description': new FormControl('')
          })
        ]),
        'other': new FormArray([
          new FormGroup({
            'from': new FormControl(''),
            'to': new FormControl(''),
            'description': new FormControl('')
          })
        ]),
        'emails': new FormArray([
          new FormGroup({
            'type': new FormControl(''),
            'email': new FormControl('', [Validators.required, Validators.email])
          })
        ]),
        'phones': new FormArray([
          new FormGroup({
            'type': new FormControl(''),
            'number': new FormControl('')
          })
        ]),
        'facebook': new FormControl(''),
        'skype': new FormControl(''),
        'address': new FormGroup({
          'address1': new FormControl(''),
          'address2': new FormControl(''),
          'city': new FormControl(''),
          'state': new FormControl(''),
          'country': new FormControl(''),
          'postalCode': new FormControl('')
        })
      });
    }
  }

  getFormArray (path: string) {
    return (<FormArray>this.form.get(path)).controls;
  }

  onSubmit() {
    const student = new StudentListModel(
      this.form.value.id,
      this.form.value.image,
      this.form.value.firstName,
      this.form.value.middleName,
      this.form.value.lastName,
      this.form.value.level,
      // this.form.value.gender,
      this.form.value.emails[0],
      this.form.value.phone,
      this.form.value.points
    );


    console.log(student);
    console.log(this.form.value);

    if (this.editMode) {
      this.studentsService.updateStudent(this.studentID, student);
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.studentsService.addStudent(student);
      this.router.navigate(['../'], { relativeTo: this.route });
    }

    // if (!this.form.valid) {
    //   return student;
    // } else {
    //   return '';
    // }
  }

  onAddItem(srt: string) {
    (<FormArray>this.form.get(srt)).push(
      new FormGroup({
        'from': new FormControl(null),
        'to': new FormControl(null),
        'description': new FormControl(null)
      })
    );
  }

  // validateEmail(email) {
  //   const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return regExp.test(String(email).toLowerCase());
  // }

  onAddEmail() {
    (<FormArray>this.form.get('emails')).push(
      new FormGroup({
        'type': new FormControl(''),
        'email': new FormControl('')
      })
    );
  }

  onAddPhone() {
    (<FormArray>this.form.get('phones')).push(
      new FormGroup({
        'type': new FormControl(''),
        'number': new FormControl('')
      })
    );
  }

  onRemove(index: number, name: string) {
    (<FormArray>this.form.get(name)).removeAt(index);
  }

  onClose() {
    if (this.editMode) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
