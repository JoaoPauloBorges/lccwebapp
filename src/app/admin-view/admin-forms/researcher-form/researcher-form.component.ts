import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../MyErrorStateMatcher';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Researcher, ResearcherTypes } from '../../../shared/models/researcher';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../../shared/confirmation-dialog/confirmation-dialog';


@Component({
  selector: 'app-researcher-form',
  templateUrl: './researcher-form.component.html',
  styleUrls: ['./researcher-form.component.scss']
})
export class ResearcherFormComponent implements OnInit, OnDestroy {
  researcherForm: FormGroup;
  SERVER_URL = 'api/researchers/';
  title = 'Registration';

  matcher = new MyErrorStateMatcher();
  subs: Subscription[] = [];
  types: ResearcherTypes[];
  researcher: Researcher;

  constructor(
    private formBuilder: FormBuilder,
    private httpCliente: HttpClient,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.types = Object.values(ResearcherTypes);
    this.researcher = this.activatedRoute.snapshot.data.researcher;
    this.researcherForm = this.formBuilder.group({
      type: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      name: ['', Validators.required],
      abbreviation: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      imagePath: ['', Validators.required],
      headline: [''],
      about: [''],
      lattesUrl: ['']
    });

    if (this.researcher != null ) {
      this.title = 'Edition';
      this.fillForm();
    }
  }

  fillForm() {
    this.researcherForm.get('type').setValue(this.researcher.type);
    this.researcherForm.get('email').setValue(this.researcher.email);
    this.researcherForm.get('name').setValue(this.researcher.name);
    this.researcherForm.get('abbreviation').setValue(this.researcher.abbreviation);
    this.researcherForm.get('phoneNumber').setValue(this.researcher.phoneNumber);
    this.researcherForm.get('imagePath').setValue(this.researcher.imagePath);
    this.researcherForm.get('headline').setValue(this.researcher.headline);
    this.researcherForm.get('about').setValue(this.researcher.about);
    this.researcherForm.get('lattesUrl').setValue(this.researcher.lattesUrl);
  }

  profileImgListener(body) {
    this.researcherForm.get('imagePath').setValue(body.filename);
    this.researcherForm.get('imagePath').updateValueAndValidity();
  }

  getImgSrc() {
    return this.researcherForm.get('imagePath').value;
  }

  onSubmit() {
    if (this.title === 'Registration') {
    this.subs.push(this.httpCliente.post(this.SERVER_URL, this.researcherForm.value)
      .subscribe(res => {
        console.log(res);
        this.snackBar.open('Successfully submitted!', 'x', {
          duration: 2000,
        });
        window.location.reload();
      }, err => {
        console.log(err),
          this.snackBar.open('Something went wrong, reload and try again', 'x', {
            duration: 2000,
          });
      }));
    } else {
      this.subs.push(this.httpCliente.patch(this.SERVER_URL + this.researcher._id, this.researcherForm.value)
      .subscribe(resp => {
        this.snackBar.open('Successfully submitted!', 'x', {
          duration: 2000,
        });
        window.location.reload();
      }, err => {
        console.log(err),
          this.snackBar.open('Something went wrong, reload and try again', 'x', {
            duration: 2000,
          });
      }));
    }
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '300px',
      data: { title: 'Are you sure you want to delete this researcher?', },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subs.push(this.httpCliente.delete(this.SERVER_URL + this.researcher._id)
          .subscribe(res => {
            this.snackBar.open('Successfully deleted!', 'x', {
              duration: 2000,
            });
            window.location.pathname = '/admin/researcher-list';
          }, err => {
            console.log(err),
              this.snackBar.open('Something went wrong, reload and try again', 'x', {
                duration: 2000,
              });
          }));
      }
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
