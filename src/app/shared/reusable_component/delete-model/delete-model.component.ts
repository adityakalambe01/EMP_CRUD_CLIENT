import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {initFlowbite} from 'flowbite'

@Component({
  selector: 'app-delete-model',
  imports: [],
  templateUrl: './delete-model.component.html',
  styleUrl: './delete-model.component.css'
})
export class DeleteModelComponent implements OnInit, OnChanges{

  @Input() _id!:string;
  @Input() title?:string = "employee";

  @Output() onConfirm: EventEmitter<any> = new EventEmitter();
  @Output() onClear: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // initFlowbite();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  onClickConfirm(){
    this.onConfirm.emit(this._id);
  }

  onClickCancel(){
    this.onClear.emit('');
  }

}
