import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service'
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products=[]
  editingProduct:Product={
    id:"",
    name:"",
    description:"",
    price:null
  }
  edit:boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct(){
    this.productService.getProduct().subscribe(
      res=>{
       this.products= res ;
      },
      err=>console.log(err)
    )
  }

  deleteProduct(event , product){
    if(confirm('are you sure that delete it')){
      this.productService.removeProduct(product.id)
    }
  }

  editProduct(product){
    this.editingProduct = {
      id:product.id,
      name:product.name,
      description:product.description,
      price:product.price 
    }

    
    this.edit= !this.edit 
  }

  updateProduct(){
   this.edit= false;
    this.productService.updateProduct(this.editingProduct);
  }

}
