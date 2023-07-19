import { Component, OnInit } from '@angular/core';
import { Product } from '../entity/products';
import { PRODUCTS } from '../entity/products-data';

@Component({
  selector: 'app-drag-n-drop',
  templateUrl: './drag-n-drop.component.html',
  styleUrls: ['./drag-n-drop.component.scss']
})
export class DragNDropComponent implements OnInit {
  availableProducts !: Product[];
  selectedProducts !: Product[];
  draggedProduct: any = null;
  draggedProducts : Product[] = [];
  area_1: any = null;
  area_2: any = null;
  startIndex : number = -1;

  ngOnInit(): void {
    this.selectedProducts = [];
    this.availableProducts = PRODUCTS;
  }

  dragStart(product: Product) {
    this.draggedProduct = product;
  }

  dragEnd() {
    this.draggedProduct = null;
  }

  addToDraggedProducts() {
    this.draggedProducts.push(this.draggedProduct);
  }

  dragIProduct(index : number) {
    console.log("Drag started for " +index);
    this.startIndex = index;
  }

  dragEndIProduct(index: number) {
    console.log("Drag ended for " + index);
  }
  dropIProduct(index: number) {
    const obj = this.draggedProducts[this.startIndex];
    this.draggedProducts.splice(this.startIndex, 1);
    this.draggedProducts.splice(index, 0, obj);
    console.log("Drop index is "+index);
  }

  deleteIProduct(index : number) {
    this.draggedProducts.splice(index, 1);
  }

  dropInArea(area: any) {
    if (area == 'area_1')
      this.area_1 = this.draggedProduct;
    else
      this.area_2 = this.draggedProduct;
  }
  delete(area: any) {
    if (area == 'area_1')
      this.area_1 = null;
    else
      this.area_2 = null;
  }

  drop() {
    if (this.draggedProduct) {
      let draggedProductIndex = this.findIndex(this.draggedProduct);
      this.selectedProducts = [...this.selectedProducts, this.draggedProduct];
      //this.availableProducts = this.availableProducts.filter((val, i) => i != draggedProductIndex);
      this.draggedProduct = null;
    }
  }

  findIndex(product: Product) {
    let index = -1;
    for (let i = 0; i < this.availableProducts.length; i++) {
      if (product.id === this.availableProducts[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }

}
