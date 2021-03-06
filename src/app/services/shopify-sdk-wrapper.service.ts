import { Injectable } from '@angular/core';
import * as ShopifyBuy from 'shopify-buy';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ShopifySdkWrapperService {
    private client: ShopifyBuy.Client;
    private checkoutId?: string;

    constructor() {
        const { shopifyDomain, storefrontAccessToken } = environment;
        this.client = ShopifyBuy.buildClient({
            domain: shopifyDomain,
            storefrontAccessToken,
        });
    }

    /**
     * すべての商品を取得する
     * @param maxNumber 最大取得数
     */
    public fetchAllProducts(maxNumber?: number): Promise<ShopifyBuy.Product[]> {
        return this.client.product.fetchAll(maxNumber);
    }

    /**
     * 商品を検索する
     */
    public searchProducts(name: string): Promise<ShopifyBuy.Product[]> {
        // see: https://shopify.dev/concepts/about-apis/search-syntax
        // 日本語の商品は検索にひっかかりにくい
        const query: ShopifyBuy.Query = {
            query: name,
            sortBy: 'title',
        };
        return this.client.product.fetchQuery(query);
    }

    /**
     * 精算を作成する
     */
    public async createCheckout(): Promise<void> {
        const cart = await this.client.checkout.create();
        this.checkoutId = String(cart.id);
        console.log(this.checkoutId);
    }

    /**
     * アイテムをカートに追加
     */
    public async addLineItem(
        variantId: string | number,
        quantity: number
    ): Promise<void> {
        const checkoutId = this.checkoutId;
        if (checkoutId == null) {
            throw new Error('invalid value');
        }

        const item: ShopifyBuy.LineItemToAdd = { variantId, quantity };
        await this.client.checkout.addLineItems(checkoutId, [item]);
        console.log(await this.client.checkout.fetch(String(checkoutId)));
    }

    public async getCheckoutUrl(): Promise<string | undefined> {
        const id = this.checkoutId;
        if (id == null) {
            throw new Error('invalid value');
        }

        const cart = await this.client.checkout.fetch(id);
        // webUrlが型定義ファイルに存在しないためanyでコンパイルエラーを回避する
        return (cart as any).webUrl;
    }
}
