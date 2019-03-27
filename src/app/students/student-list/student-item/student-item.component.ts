import { Component, OnInit, Input } from '@angular/core';
import { StudentListModel } from '../../student-models';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray } from '@angular/forms';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.scss']
})
export class StudentItemComponent implements OnInit {
  @Input() student: StudentListModel;
  genders: { value: string | number, text: string }[];
  countries: { value: string | number, text: string }[];
  emails: { value: string | number, text: string }[];
  phones: { value: string | number, text: string }[];

  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.genders = this.studentsService.genders;
    this.countries = this.studentsService.countries;
    this.emails = this.studentsService.emails;
    this.phones = this.studentsService.phones;
  }

  onEdit (id: string) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  // onEdit (student: StudentListModel) {
  //   const id = this.studentsService.getStudents().indexOf(student);
  //   this.router.navigate([id, 'edit'], { relativeTo: this.route });
  // }

  onRemove(id: string) {
    this.studentsService.removeStudent(id);
  }
}
