<script lang="ts" setup>
import HpySimpleCard from "@/components/HpySimpleCard.vue"
import {useShopStore} from "@/store/shop"
import { onMounted } from "vue";
const shopStore = useShopStore();

onMounted(async () => {
    await shopStore.setStoreProducts()
})

</script>

<template>
    <div class="store-products p-4">
        <p class="mb-4">
            نام محصولات
        </p>
        <template v-if="shopStore.serverState === 'SUCCESSFUL'">
            <HpySimpleCard 
                v-for="(product, index) in shopStore.currentStoreProducts" 
                :key="index" 
                :title="product.name"
                :loading="false" 
                @click="() => shopStore.addToBaket(product.id)"
            />
        </template>

        <template v-else-if="shopStore.serverState === 'PENDING'">
            <HpySimpleCard :loading="true" />
        </template>
    </div>
</template>

<style lang="scss" scoped>
.store-products {
    border: 1px solid rgb(226 232 240);
    border-radius: 0.5rem;
}
</style>