import { Injectable } from '@angular/core';
import { StudentListModel } from './student-models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  // studentsChanged = new Subject<StudentListModel[]>();

  students: StudentListModel[] = [
    {
      id: '0',
      image: 'https://m.media-amazon.com/images/G/01/gcx/gf/age-group-woman-circle._CB278609004_.png',
      firstName: 'Ani',
      middleName: '',
      lastName: 'Karapetyan',
      level: 'Beginner',
      email: 'anik@ogmainc.com',
      phone: '55 88 77 88',
      points: 4.5
    },
    {
      id: '1',
      image: 'http://ptf.su/rwf2018/img/speakers/Gogohiya300x300.jpg',
      firstName: 'Anna',
      middleName: '',
      lastName: 'Hovhannisyan',
      level: 'Beginner',
      email: 'annh@ogmainc.com',
      phone: '93 74 55 42',
      points: 3.5
    },
    {
      id: '2',
      image: 'https://secure.gravatar.com/avatar/92ad409bfd00f0d31ad2c902d95a6188?s=400&d=mm&r=g',
      firstName: 'Arman',
      middleName: '',
      lastName: 'Vardanyan',
      level: 'Tyro',
      email: 'armv@ogmainc.com',
      phone: '41 55 44 77',
      points: 7.4
    },
    {
      id: '3',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpdEkkfe2387K-TRjeFCAQ4GNJLN27gFA_J5ZySCWJ9SQLp3Fu_Q',
      firstName: 'Yang',
      middleName: '',
      lastName: 'Bo',
      level: 'Novice',
      email: 'samb@ogmainc.com',
      phone: '93 55 66 66',
      points: 6
    },
    {
      id: '4',
      image: 'https://thedomesticatedman.files.wordpress.com/2015/11/cropped-img_963321.jpg',
      firstName: 'Vahe',
      middleName: '',
      lastName: 'Kirakosyan',
      level: 'Novice',
      email: 'vahek@ogmainc.com',
      phone: '77 88 44 55',
      points: 2.9
    }
  ];

  public genders = [
    { value: 0, text: '' },
    { value: 1, text: 'Male' },
    { value: 2, text: 'Female' }
  ];

  public countries = [
    { value: 0, text: '' },
    { value: 1, text: 'Armenia' },
    { value: 2, text: 'USA' }
  ];

  public emails = [
    { value: 0, text: '' },
    { value: 1, text: 'Home' },
    { value: 2, text: 'Work' },
    { value: 3, text: 'Other' }
  ];

  public phones = [
    { value: 0, text: '' },
    { value: 1, text: 'Cell' },
    { value: 2, text: 'Home' },
    { value: 3, text: 'Work' },
    { value: 4, text: 'Other' }
  ];

  constructor() {
  }

  public studentsChanged: BehaviorSubject<StudentListModel[]> = new BehaviorSubject(this.students);

  getStudent(id: string) {
    return this.students[id];
  }

  getStudents() {
    return this.students.slice();
  }

  addStudent(student: StudentListModel) {
    console.log(student);
    this.students.push(student);
    this.studentsChanged.next(this.students.slice());
  }
  updateStudent(id: string, student: StudentListModel) {
    this.students[id] = student;
    this.studentsChanged.next(this.students.slice());
    console.log(student);
  }

  removeStudent(id: string) {
    const index = this.students.findIndex(student => student.id === id);

    if (index !== -1) {
      this.students.splice(index, 1);
      this.studentsChanged.next(this.students.slice());
    }
  }
}
