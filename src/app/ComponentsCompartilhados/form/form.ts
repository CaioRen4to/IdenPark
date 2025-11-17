import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface FieldOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})

export class Form {

  @Input() title: string = '';  
  @Input() fields: Array<{ label: string; type: string; name: string; options?: FieldOption[]; placeholder?: string }> = [];

  @Output() dataChanged = new EventEmitter<any>();  

  formData: Record<string, any> = {};
 

  ngOnInit() {
    this.fields.forEach(field => {
      this.formData[field.name] = '';
    });
  }

  onFieldChange(field: { label: string; type: string; name: string; options?: FieldOption[]; placeholder?: string }, event: any) {
  this.formData[field.name] = event.target.value;
  this.dataChanged.emit(this.formData);
 }
}
