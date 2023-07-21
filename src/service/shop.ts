import API from './API'
import { Shop, StoreProduct, Order, ApiParams } from "@/type/index"
import { getUserId } from '@/utils/authUtil'

export function getShopList(params?: ApiParams): Promise<Shop[]> {
    return new Promise((resolve, reject) => {
        let setParams = params?.pagination ? `&_page=${params.pagination.page}&_limit=${params.pagination.limit}` : ''
        API().get(`/stores?userIds_like=${getUserId()}${setParams}`).then(response => {
            if (!response.data.err){
                resolve([...response.data])                  
            }
            else {

                    reject("ERROR")

            }
        }).catch(() => {

                reject("ERROR")

        })
    })
}

export async function handleShopListRequest(currentPage: number, setShopList: Function) {
    try{      
        let result = await getShopList({pagination: {page: currentPage, limit: 100}})        
        if(result.length < 100)
            return;
        setShopList(result)
        await handleShopListRequest(currentPage + 1, setShopList)
    }
    catch {      
        handleShopListRequest(currentPage, setShopList)
    }
    
    /* do {
        try{
            console.log('currentPage: ', currentPage);
            let response: any = await getShopList({pagination: {page: currentPage, limit: limit}})
            if(!init){
                totalItem = response.count;
                totalpage = Math.ceil(totalItem / limit)
                init = true
            }
            currentPage ++;
            result.push(...response.data)
        }
        catch {
            console.log('handleShopListRequest catch: ', currentPage)
       }
    } while (totalpage >= currentPage) */
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