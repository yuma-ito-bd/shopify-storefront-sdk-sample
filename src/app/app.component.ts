import { Component, OnInit } from '@angular/core';
import { ShopifySdkWrapperService } from './services/shopify-sdk-wrapper.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'shopify-storefront-sdk-sample';
    products!: ShopifyBuy.Product[];

    constructor(private shopify: ShopifySdkWrapperService) {}

    async ngOnInit(): Promise<void> {
        this.products = await this.shopify.fetchAllProducts();
        this.products.forEach((product) => {
            console.log(product);
        });
    }
}
