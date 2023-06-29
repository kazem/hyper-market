<script lang="ts" setup>
import HpyStoreProducts from "@/components/HpyStoreProducts.vue"
import HpyBasketItems from "@/components/HpyBasketItems.vue"
import HpyPayment from '@/components/HpyPayment.vue'

</script>

<template>
    <div class="p-4 mt-4 flex flex-col gap-4 md:flex-row md:justify-between md:items-start w-full md:grow">
        <HpyStoreProducts class="md:w-2/6" />
        <HpyPayment class="md:w-1/6" />
        <HpyBasketItems class="md:w-3/6" />
    </div>
</template>

<style lang="scss" scoped>
.store-products {
    
}
</style>