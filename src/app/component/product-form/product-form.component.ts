import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service'
import {Product} from '../../models/product'
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product:Product = {
    name:'',
    description:'',
    price:null
  }
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  addProduct(){
    this.productService.addProduct(this.product);
    this.product= {}
  }

}
