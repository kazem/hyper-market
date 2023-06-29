<script lang="ts" setup>
import {useShopStore} from '@/store/shop'
import {getUsername} from '@/utils/authUtil'
import {useRouter} from 'vue-router/composables'
const router = useRouter()
const shopStore = useShopStore();

</script>

<template>
    <div class="header p-4">
        <p @click="router.push('/stores')" class="text-sm w-1/4 text-left cursor-pointer">
            بازگشت
        </p>
        <p class="w-2/4">{{shopStore.currentShopTitle}}</p>
        <p class="text-sm w-1/4 text-right">{{getUsername()}}</p>
    </div>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    width: 100%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>