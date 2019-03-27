import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamLogItemComponent } from './exam-log-item.component';

describe('ExamLogItemComponent', () => {
  let component: ExamLogItemComponent;
  let fixture: ComponentFixture<ExamLogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamLogItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamLogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
