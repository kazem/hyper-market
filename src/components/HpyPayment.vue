<script lang="ts" setup>
import {onBeforeMount, onMounted, ref} from 'vue'
import {useShopStore} from "@/store/shop"
import { VBtn, VSnackbar } from 'vuetify/lib/components'
const shopStore = useShopStore();

const createOrder = async () => {
    await shopStore.createOrder()
}

onBeforeMount(() => {
    shopStore.setOrderState("NONE")
})


</script>

<template>
    <div class="payment p-4">
        <p class="mb-4">
            پرداخت
        </p>
        <div class="flex justify-between items-center mb-4">
            <p v-seperator="shopStore.basketTotalPrice" class="text-sm"></p>
            <p class="text-sm" style="direction: rtl;">
                مبلغ کل:
            </p>
        </div>
        <VBtn
            class="w-full"
            :disabled="!shopStore.basketTotalPrice"
            @click="() => createOrder()"
            :loading="shopStore.orderState === 'PENDING' ? true : false"
        >
            ارسال اطلاعات
        </VBtn>
        <v-snackbar 
             :timeout="3000"
            :color="shopStore.orderState === 'SUCCESSFUL' ? '#198754' : 'red'" 
            :value="shopStore.orderState !== 'PENDING' &&  shopStore.orderState !== 'NONE' ? true : false"
        >
            <p v-if="shopStore.orderState === 'SUCCESSFUL'" class="text-center">با موفقیت انجام شد</p>
            <p v-else class="text-center">عملیات ناموفق</p>
        </v-snackbar>
    </div>
</template>

<style lang="scss" scoped>
.payment {
    border: 1px solid rgb(226 232 240);
    border-radius: 0.5rem;
}
</style>