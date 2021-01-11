import { Injectable } from '@angular/core';
import * as ShopifyBuy from 'shopify-buy';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ShopifySdkWrapperService {
    private client: ShopifyBuy.Client;

    constructor() {
        const { shopifyDomain, storefrontAccessToken } = environment;
        this.client = ShopifyBuy.buildClient({
            domain: shopifyDomain,
            storefrontAccessToken,
        });
    }

    /**
     * すべての商品を取得する
     */
    public fetchAllProducts(): Promise<ShopifyBuy.Product[]> {
        return this.client.product.fetchAll();
    }
}
