import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamLogListComponent } from './exam-log-list.component';

describe('ExamLogListComponent', () => {
  let component: ExamLogListComponent;
  let fixture: ComponentFixture<ExamLogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
