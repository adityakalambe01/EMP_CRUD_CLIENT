import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  protected initialPageSize:number = 10;

  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() totalRecords: number = 0;
  @Output() changePage = new EventEmitter<any>();
  @Output() changePageSize = new EventEmitter<any>();

  onChangePage(pageNo:number) {
    this.changePage.emit(pageNo);
  }

  onChangePageSize() {
    this.changePageSize.emit(this.initialPageSize);
  }
}
