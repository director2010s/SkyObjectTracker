import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportFormPresenterComponent } from '../presenters/report-form-presenter.component';
import { ReportFormViewModel } from '../view-models/report-form.view-model';

@Component({
  selector: 'app-report-form-container',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportFormPresenterComponent
  ],
  providers: [ReportFormViewModel],
  template: `
    <app-report-form-presenter
      [state]="viewModel.state"
      (formSubmit)="onFormSubmit($event)"
    />
  `,
  host: {
    class: 'block'
  }
})
export class ReportFormContainerComponent implements OnInit {
  constructor(public viewModel: ReportFormViewModel) {}

  ngOnInit() {
    this.viewModel.initialize();
  }

  onFormSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("xxxForm submitted:step0");
    this.viewModel.submitForm();
  }
}