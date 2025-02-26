import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {initFlowbite} from 'flowbite'

@Component({
  selector: 'app-checkbox-dropdown',
  imports: [CommonModule],
  templateUrl: './checkbox-dropdown.component.html',
  styleUrl: './checkbox-dropdown.component.css',
})
export class CheckboxDropdownComponent implements OnInit {
  @Input() options!: string[];
  @Input() id: string = 'dropdownSearchButton';
  @Input() data_dropdown_toggle: string = 'dropdownSearch';

  @Output() onClick = new EventEmitter();
  ngOnInit(): void {
    // initFlowbite();
  }

  emmitValue(value: string) {
    this.onClick.emit(value);
  }
}
