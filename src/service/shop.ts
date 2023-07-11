import API from './API'
import { Shop, StoreProduct, Order, ApiParams } from "@/type/index"
import { getUserId } from '@/utils/authUtil'

export async function getShopList(params?: ApiParams): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
        let setParams = params?.pagination ? `&_page=${params.pagination.page}&_limit=${params.pagination.limit}` : ''
        API().get(`/stores?userIds_like=${getUserId()}${setParams}`).then(response => {
            if (!response.data.err){
                /* const res: any = {
                    data: response.data,
                    count: response.headers["x-total-count"]
                } */

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

export async function handleShopListRequest(currentPage: number, prevResult: Shop[]): Promise<Shop[] | undefined> {
    console.log('currentPage: ', currentPage)
    let limit = 100;
    try {
        let response: any = await getShopList({pagination: {page: currentPage, limit: limit}})
        if(response && response.length === 100){
            console.log('Recall')
            let newPage = currentPage + 1;
            console.log('newPage: ', newPage)
            prevResult.concat(response)
            handleShopListRequest(newPage, prevResult)
            return prevResult;
        }
        else {
            console.log('End')
            prevResult.concat(response)
            return prevResult;
        }
    }
    catch {
        console.log('handleShopListRequest catch: ', currentPage)
        handleShopListRequest(currentPage, prevResult)
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