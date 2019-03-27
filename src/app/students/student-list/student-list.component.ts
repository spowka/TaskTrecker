import { Component, OnInit } from '@angular/core';
import { StudentListModel } from '../student-models';
import { StudentsService } from '../students.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: StudentListModel[];
  subscription: Subscription;

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.students = this.studentsService.getStudents();
    this.subscription = this.studentsService.studentsChanged
      .subscribe((students: StudentListModel[]) => {
        this.students = students;
      });

    // this.students = this.studentsService.getStudents();
  }

}
