import { Component, OnInit } from '@angular/core';
import { ModalService } from '../students/modal.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit() {
  }

  openModalDialog() {
    this.modalService.isFormModalOpen = true;
  }
}
