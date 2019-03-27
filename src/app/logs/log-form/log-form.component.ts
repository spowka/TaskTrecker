import { ModalService } from 'src/app/students/modal.service';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormControlDirective,
  FormControlName } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChildren,
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
  Renderer2 } from '@angular/core';
import { LogModel } from '../log-models';
import { LogService } from '../log.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

// From FormControls access to native HTML elements
const originFormControlNgOnChanges = FormControlDirective.prototype.ngOnChanges;
FormControlDirective.prototype.ngOnChanges = function () {
    this.form.nativeElement = this.valueAccessor._elementRef.nativeElement;
    return originFormControlNgOnChanges.apply(this, arguments);
};
const originFormControlNameNgOnChanges = FormControlName.prototype.ngOnChanges;
FormControlName.prototype.ngOnChanges = function () {
    const result = originFormControlNameNgOnChanges.apply(this, arguments);
    this.control.nativeElement = this.valueAccessor._elementRef.nativeElement;
    return result;
};

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss']
})
export class LogFormComponent implements OnInit, AfterViewInit {
  @ViewChildren('liDifficulty') liDifficulty: ElementRef;
  @ViewChildren('liParagraphs') liParagraphs: ElementRef;
  @ViewChildren('liSubjects') liSubjects: ElementRef;
  @ViewChildren('liLevels') liLevels: ElementRef;
  // @ViewChildren(VisibleDirective, {read: ElementRef}) visibleElems: QueryList<ElementRef>;
  // set appBacon(directive: AppErrorMessageDirective) {
  //   this.extraIngredient = directive.visibility;
  // }

  subscription: Subscription;
  logId: number;
  editMode = false;
  form: FormGroup;
  logs: LogModel[];
  interchange: string[];
  difficulty: { value: string | number, text: string }[];
  paragraphs: { value: string | number, text: string }[];
  subjects: { value: string | number, text: string }[];
  levels: { value: string | number, text: string }[];

  constructor(
    public modalService: ModalService,
    public logService: LogService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.difficulty = this.logService.difficulty;
    this.paragraphs = this.logService.paragraphs;
    this.subjects = this.logService.subjects;
    this.levels = this.logService.levels;
    this.logs = this.logService.getLogs();
    this.logId = +this.route.snapshot.params['id'];
    this.route.params
    .subscribe(
      (params: Params) => {
        this.logId = +params['id'];
        this.editMode =  params['id'] != null;
        this.initForm();
      }
    );
  }

  ngAfterViewInit() {
    if (this.editMode) {
      const event = new MouseEvent('click', {bubbles: true});
      this.liDifficulty.toArray()[this.form.value.difficulty].nativeElement.dispatchEvent(event);
      this.liSubjects.toArray()[this.form.value.subject].nativeElement.dispatchEvent(event);
      this.liParagraphs.toArray()[this.form.value.paragraph].nativeElement.dispatchEvent(event);
      this.liLevels.toArray()[this.form.value.level].nativeElement.dispatchEvent(event);
      this.cdr.detectChanges();
    }
  }

  onClose() {
    if (this.editMode) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  getFormArray (path: string) {
    return (<FormArray>this.form.get('interchange')).controls;
  }

  onAddLog() {
    (<FormArray>this.form.get('interchange')).insert(0,
      new FormGroup({
        'question': new FormControl(null),
        'answer': new FormControl(null),
      })
    );
  }

  onClearAll() {
    while ((<FormArray>this.form.get('interchange')).length !== 0) {
      (<FormArray>this.form.get('interchange')).removeAt(0);
    }

    (<FormArray>this.form.get('interchange')).insert(0,
      new FormGroup({
        'question': new FormControl(null),
        'answer': new FormControl(null),
      })
    );
  }

  getFileContent(inpt: ElementRef) {
      while ((<FormArray>this.form.get('interchange')).length !== 0) {
        (<FormArray>this.form.get('interchange')).removeAt(0);
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.interchange = reader.result.toString().trim().split('\n');
        for (let i = 0; i < this.interchange.length; i ++ ) {
          const interchange = this.interchange[i];
          (<FormArray>this.form.get('interchange')).push(new FormGroup({
            'question': new FormControl(interchange.substring(0, interchange.indexOf('//ANSWER:'))),
            'answer': new FormControl(interchange.substring(interchange.indexOf('//ANSWER:') + 9))
          }));
        }
      };

      reader.readAsText((inpt).files[0]);
      this.form.patchValue({
        'file': ''
      });
  }

  onRemove(index: number) {
    (<FormArray>this.form.get('interchange')).removeAt(index);
  }

  onSubmit(btnSave: ElementRef) {
    if (!this.form.valid) {
      const invalid = <FormControl[]>Object.keys(this.form.controls).map(key => this.form.controls[key]).filter(ctl => ctl.invalid);
      const event = new CustomEvent('input', {bubbles: true});

      if (invalid.length > 0) {
        const invalidElem: any = invalid[0];

        invalid.forEach((elem) => {
          (<any>elem).nativeElement.dispatchEvent(event);
        });

        if (invalidElem.nativeElement.getAttribute('type') !== 'hidden') {
          invalidElem.nativeElement.focus();
        } else {
          invalidElem.nativeElement.parentNode.focus();
        }
      }

      return false;
    }

    // if (!this.form.valid) {
    //   const event = new CustomEvent('input', {bubbles: true});
    //   this.requiredElems.toArray().forEach(elem => {
    //     elem.nativeElement.dispatchEvent(event);
    //   });
    //   // const invalidElems = this.errorElems.toArray().filter(elem => {
    //   //   console.log(elem.nativeElement.style.visibility === 'visible');
    //   //   return elem.nativeElement.style.visibility === 'visible';
    //   // });
    //   let focusElement = {
    //     visibility: false,
    //     index: undefined
    //   };
    //   let reqElems = this.visibleElems.toArray();
    //   this.visibleElemsSubscribtion.toArray().forEach((item, index) => {
    //     item.visibilityChanged.subscribe((elem: ElementRef) => {
    //       if (!focusElement.visibility && elem) {
    //         focusElement.visibility = true;
    //         focusElement.index = index;
    //         console.log(reqElems[index].nativeElement.getAttribute('appAppErrorMessage'));
    //           this.renderer.setAttribute(reqElems[index].nativeElement, 'tabindex', '0');
    //           reqElems[index].nativeElement.focus();
    //       }
    //     });
    //   });
      // .visibilityChanged.subscribe((elem: ElementRef) => {
      //   this.renderer.setAttribute(elem, 'tabindex', '0');
      //   elem.focus();
      //   if (elem.hasAttribute('required') && elem.style.visibility === 'visible') {
      //   }
      // });
      // if (invalidElems.length > 0) {
      //   invalidElems[0].nativeElement.focus();
      // }
    //   return false;
    // }

    const log = new LogModel(
      this.form.value.title,
      this.form.value.difficulty,
      this.form.value.subject,
      this.form.value.paragraph,
      this.form.value.level,
      this.form.value.descriptionText,
      this.form.value.interchange,
      this.form.value.id);

    if (this.editMode) {
      this.logService.updateLog(this.logId, log);
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.logService.addLog(log);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  private initForm() {
    if (this.editMode) {
      const log = this.logService.getLog(this.logId);

      this.form = new FormGroup({
        'title': new FormControl(log.title),
        'difficulty': new FormControl(log.difficulty),
        'subject': new FormControl(log.subject),
        'paragraph': new FormControl(log.paragraph),
        'level': new FormControl(log.level),
        'descriptionText': new FormControl(log.descriptionText),
        'file': new FormControl(''),
        'interchange': new FormArray([
          new FormGroup({
            'question': new FormControl(log.interchange[0].question),
            'answer': new FormControl(log.interchange[0].answer)
          })
        ])
      });
    } else {
      this.form = new FormGroup({
        'title': new FormControl(''),
        'difficulty': new FormControl(''),
        'subject': new FormControl(''),
        'paragraph': new FormControl(''),
        'level': new FormControl(''),
        'descriptionText': new FormControl(''),
        'file': new FormControl(''),
        'interchange': new FormArray([
          new FormGroup({
            'question': new FormControl(''),
            'answer': new FormControl('')
          })
        ])
      });
    }
  }

  onCheckValidation(event) {
    if (event.target.value === '') {
      event.target.parentElement.nextElementSibling.style.opacity = 1;
    } else {
      event.target.parentElement.nextElementSibling.style.opacity = 0;
    }
  }
}
