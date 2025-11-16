import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  @Input() title: string = '';
  @Input() fields: Array<{ label: string; type: string; name: string; placeholder: string }> = [];

  @Output() dataChanged = new EventEmitter<any>();  

  formData: Record<string, any> = {};

  ngOnInit() {
    this.fields.forEach(field => {
      this.formData[field.name] = '';
    });
  }

  onFieldChange() {
    this.dataChanged.emit(this.formData);
  }
}

