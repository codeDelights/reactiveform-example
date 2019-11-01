import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  studentForm: FormGroup;

  junkData: any = {
    name: "Karthik",
    dep: "IT",
    semesters: [
      {
        sem: "First",
        subjects: [
          {
            subject: "English",
            marks: {
              theory: 79,
              practical: 19
            }
          },
          {
            subject: "Maths",
            marks: {
              theory: 79,
              practical: 20
            }
          },
          {
            subject: "Computer",
            marks: {
              theory: 80,
              practical: 20
            }
          }
        ]
      },
      {
        sem: "Second",
        subjects: [
          {
            subject: "English",
            marks: {
              theory: 79,
              practical: 19
            }
          },
          {
            subject: "Maths",
            marks: {
              theory: 79,
              practical: 20
            }
          },
          {
            subject: "Computer",
            marks: {
              theory: 80,
              practical: 20
            }
          }
        ]
      },
      {
        sem: "Third",
        subjects: [
          {
            subject: "English",
            marks: {
              theory: 79,
              practical: 19
            }
          },
          {
            subject: "Maths",
            marks: {
              theory: 79,
              practical: 20
            }
          },
          {
            subject: "Computer",
            marks: {
              theory: 80,
              practical: 20
            }
          }
        ]
      }
    ]
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.studentForm = this.fb.group({
      name: [''],
      dep: [''],
      semesters: this.fb.array([])
    });
  }

  get semCtrl() {
    return this.studentForm.get('semesters') as FormArray;
  }

  get semester() {
    return this.fb.group({
      sem: [''],
      subjects: this.fb.array([])
    });
  }

  get subject() {
    return this.fb.group({
      subject: [''],
      marks: this.fb.group({
        theory: [''],
        practical: ['']
      })
    });
  }

  addSemester() {
    this.semCtrl.push(this.semester);
  }

  addSubject(index) {
    (this.semCtrl.at(index).get('subjects') as FormArray).push(this.subject);
  }

  loadForm() {
    this.studentForm = null;
    this.createForm();
    this.junkData.semesters.forEach((sem, i) => {
      this.addSemester();
      console.log('i =>', i);
      sem.subjects.forEach((sub, j) => {
        this.addSubject(i);
        console.log('j =>', j);
      });
    });
    this.studentForm.patchValue(this.junkData);
  }

  resetForm() {
    this.studentForm = null;
    this.createForm();
  }

}
