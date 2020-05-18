import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   products:Observable<any[]>

   constructor(private firestore : AngularFirestore) { 
     
     this.products =firestore.collection('products').snapshotChanges().pipe(
       map(action =>action.map(a=>{
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
       }))
       )
      
   }

   getProduct(){
     return this.products;
   }

   addProduct(product:Product){
     this.firestore.collection('products').add(product)
   }

   removeProduct(id){
     return this.firestore.doc(`products/${id}`).delete();
   }

   updateProduct(product:Product){
     return this.firestore.doc(`products/${product.id}`).update(product)
   }
}
