<script lang="ts" setup>
import {useShopStore} from '@/store/shop'
import { onBeforeUnmount, onMounted } from 'vue';
import {useRouter} from 'vue-router/composables'
import HpySimpleCard from '@/components/HpySimpleCard.vue'
const router = useRouter()

const shopStore = useShopStore();
const selectStore = (storeId: string) => {   
    shopStore.setSelectedStore(storeId)
    router.push('/home')
}
onMounted(async () => {  
    await shopStore.setShopList()
})
</script>


<template>
  <div class="store-page pt-4 mb-4 px-4">
      <p>
          لیست فروشگاه‌های شما
      </p>      
      <template v-if="shopStore.serverState === 'SUCCESSFUL'">
          <template v-if="shopStore.shopListCount > 0">
            <HpySimpleCard 
                v-for="(store, index) in shopStore.shopList" 
                :key="index" 
                :title="store.title" 
                @click="() => selectStore(store.id)"
            />
          </template>
          <template v-if="shopStore.shopListCount === 0">
            <p>
                فروشگاهی جهت نمایش برای شما وجود ندارد
            </p>
          </template>
      </template>
      <template v-else-if="shopStore.serverState === 'PENDING'">
            <HpySimpleCard :loading="true" />
      </template>
  </div>
</template>


<style lang="scss" scoped>
.store-page {    
    margin: auto;
    max-width: 550px;    
}
</style>>

