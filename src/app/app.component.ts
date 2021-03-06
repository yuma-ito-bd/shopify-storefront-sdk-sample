import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ShopifySdkWrapperService } from './services/shopify-sdk-wrapper.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'shopify-storefront-sdk-sample';
    products!: ShopifyBuy.Product[];
    searchForm = new FormControl('');

    constructor(private shopify: ShopifySdkWrapperService) {}

    async ngOnInit(): Promise<void> {
        this.products = await this.shopify.fetchAllProducts();

        // await this.shopify.createCheckout();

        // const redTshirtsSmallId = this.products[0].variants[0].id;
        // const redTshirtsMediumId = this.products[0].variants[1].id;
        // const redTshirtsLargeId = this.products[0].variants[2].id;
        // const whiteTshirtsId = this.products[1].variants[0].id;

        // // FIXME: 連続で実行するのはパフォーマンスが悪い
        // await this.shopify.addLineItem(whiteTshirtsId, 1);
        // await this.shopify.addLineItem(redTshirtsSmallId, 1);
        // await this.shopify.addLineItem(redTshirtsMediumId, 2);
        // await this.shopify.addLineItem(redTshirtsLargeId, 3);
        // console.log(await this.shopify.getCheckoutUrl());
    }

    /**
     * 検索ボタン押下時処理
     */
    async onSearch(): Promise<void> {
        // フォームに入力された値で商品を検索する
        const { value } = this.searchForm;
        this.products = await this.shopify.searchProducts(value);
    }
}
