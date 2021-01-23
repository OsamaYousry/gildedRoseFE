import { Component, OnInit } from '@angular/core';
import { ItemDTO } from '../../dtos/ItemDTO';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  ELEMENT_DATA: ItemDTO[] = [
    { name: 'Conjured', quality: 10, sellIn: 2 },
    { name: 'Sulfuras', quality: 10, sellIn: 2 },
    { name: 'Aged Brie', quality: 10, sellIn: 2 },
    { name: 'Conjured', quality: 10, sellIn: 2 },
  ];
  displayedColumns: string[] = ['name', 'quality', 'sellIn'];
  dataSource = this.ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
