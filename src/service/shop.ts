import API from './API'
import { Shop, StoreProduct, Order } from "@/type/index"
import { getUserId } from '@/utils/authUtil'

export async function getShopList(): Promise<Shop[]> {
    return await API().get(`/stores?userIds_like=${getUserId()}`).then(response => {
        if (!response.data.err)
            return response.data;
        else {
            throw {
                message: 'Server Error'
            }

        }
    })
}

export async function getShopProducts(shopId: string): Promise<StoreProduct[]> {
    return await API().get(`/storeProducts?storeIds_like=${shopId}`).then(response => {
        if (!response.data.err)
            return response.data;
        else {
            throw {
                message: 'Server Error'
            }

        }
    })
}

export async function createOrder(order: Order): Promise<Order> {
    return await API().post(`/orders`, order).then(response => {
        if (!response.data.err) {
            localStorage.setItem('lastRegisteredOrder', JSON.stringify(response.data))
            return response.data;
        }
        else {
            throw {
                message: 'Server Error'
            }

        }
    })
}