import { defineStore } from 'pinia'
import { Shop, ServerState, StoreProduct, basketItem, Order } from "@/type/index"
import { getShopList, getShopProducts, createOrder, handleShopListRequest } from "@/service/shop"

export const useShopStore = defineStore('shop', {
    state: () => {
        return {
            currentShop: null as Shop | null,
            currentStoreProducts: [] as StoreProduct[],
            shopList: [] as Shop[] | undefined,
            basketItems: [] as basketItem[],
            serverState: ServerState.NONE as ServerState,
            orderState: ServerState.NONE as ServerState
        }
    },
    actions: {
        async setShopList() {
            this.setServerState(ServerState.PENDING)
            try {
                await handleShopListRequest(1, this.setShopListState)             
                this.setServerState(ServerState.SUCCESSFUL)
            }
            catch (e) {
                console.log('catch: ', e);
                this.setServerState(ServerState.ERROR)
            }
        },

        setShopListState(shopList: Shop[]) { 
            this.shopList = this.shopList?.concat(shopList)         
        },

        setSelectedStore(storeId: string) {
            let selectedShop = this.shopList?.find(shop => shop.id === storeId);
            if (selectedShop)
                this.currentShop = selectedShop;
        },

        async setStoreProducts() {
            this.setServerState(ServerState.PENDING)
            try {
                this.currentStoreProducts = await getShopProducts(this.currentShop!.id)
                this.setServerState(ServerState.SUCCESSFUL)
            }
            catch (e) {
                console.log('catch: ', e);
                this.setServerState(ServerState.ERROR)
            }
        },

        addToBaket(productId: string) {
            let indexInBasket = this.basketItems.findIndex(item => item.productId === productId)
            let selectedProduct = this.currentStoreProducts.find(p => p.id === productId)
            if (indexInBasket > -1 && selectedProduct) {
                let count = this.basketItems[indexInBasket].count;
                let price = this.basketItems[indexInBasket].price;
                if (count)
                    this.basketItems[indexInBasket].price = (price / count) * (count + 1)
                else
                    this.basketItems[indexInBasket].price = selectedProduct.price;
                this.basketItems[indexInBasket].count++;
            }

            else {

                if (selectedProduct)
                    this.basketItems.push({ productId: selectedProduct.id, name: selectedProduct.name, count: 1, price: selectedProduct.price })
            }
        },

        removeFromBasket(productId: string) {
            this.basketItems = this.basketItems.filter(item => item.productId !== productId)
        },

        setProductCountToBasket(productId: string, newCount: number) {
            let indexInBasket = this.basketItems.findIndex(item => item.productId === productId)
            let selectedProduct = this.currentStoreProducts.find(p => p.id === productId)
            if (indexInBasket > -1 && selectedProduct) {
                let count = this.basketItems[indexInBasket].count;
                let price = this.basketItems[indexInBasket].price;
                if (count)
                    this.basketItems[indexInBasket].price = (price / count) * (newCount);
                else
                    this.basketItems[indexInBasket].price = newCount * selectedProduct.price;
                this.basketItems[indexInBasket].count = newCount;
            }
        },

        async createOrder() {
            this.setOrderState(ServerState.PENDING)
            try {
                let data = {

                }
                await createOrder(this.order)
                this.basketItems = []
                this.setOrderState(ServerState.SUCCESSFUL)
            }
            catch (e) {
                console.log('catch: ', e);
                this.setOrderState(ServerState.ERROR);
            }
        },

        setServerState(serverState: ServerState) {
            this.serverState = serverState
        },
        setOrderState(orderState: ServerState) {
            this.orderState = orderState
        }
    },
    getters: {
        shopListCount(): number {
            if(this.shopList)
                return this.shopList.length;
            else
                return 0
        },
        currentShopTitle(): string {
            if (this.currentShop)
                return this.currentShop.title;
            return ''
        },
        basketTotalPrice(): number {
            return this.basketItems.reduce((prev, item) => {
                return prev += item.price
            }, 0)
        },
        order(): Order {
            return {
                items: this.basketItems,
                totalPrice: this.basketTotalPrice
            }
        }
    },
})