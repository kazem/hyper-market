<script lang="ts" setup>
import {useShopStore} from "@/store/shop"
import { VTextField } from 'vuetify/lib/components'
const shopStore = useShopStore();

const changeCountProduct = (productId: string, count: any) => {  
    shopStore.setProductCountToBasket(productId, Number(count.replace(/\,/g, '')))  
}

</script>

<template>
  <div class="basket-item p-4">
      <p class="mb-4">
          فاکتور
      </p>
      <table class="w-full">  
        <thead>
            <tr>
                <th class="text-center text-sm basket-item_cell py-2">              
                </th>
                <th class="text-center text-sm basket-item_cell py-2">
                    قیمت کل
                </th>
                <th class="text-center text-sm basket-item_cell py-2 w-20">
                    تعداد
                </th>
                <th class="text-center text-sm basket-item_cell py-2">
                    نام محصول
                </th>
            </tr>
        </thead>
        <tbody v-show="shopStore.basketItems.length > 0">
            <tr
            v-for="(item, index) in shopStore.basketItems"
            :key="index"
            >
                <td @click="() => shopStore.removeFromBasket(item.productId)" class="text-center text-sm basket-item_cell py-2 cursor-pointer text-red-500">حذف</td>
                <td v-seperator="item.price" class="text-center text-sm basket-item_cell py-2"></td>
                <td class="text-center text-sm basket-item_cell py-2 flex justify-center">              
                    <VTextField              
                        class="px-2"                                                                          
                        placeholder="تعداد"                     
                        :min="1"                    
                        :value="shopStore.basketItems[index].count | toCurrency"
                        @input="(e) => changeCountProduct(item.productId, e)"                   
                    />                   
                </td>
                <td class="text-center text-sm basket-item_cell py-2">{{ item.name }}</td>
            </tr>
        </tbody>        
    </table>
    <p v-show="shopStore.basketItems.length === 0" class="text-center p-2">
           محصولی انتخاب نشده است
    </p>
  </div>
</template>

<style lang="scss" scoped>
.basket-item {
    border: 1px solid rgb(226 232 240);
    border-radius: 0.5rem;
    &_cell {
        border: 1px solid rgb(241 245 249);
    }
}
input {
    text-align: center;
}
</style>