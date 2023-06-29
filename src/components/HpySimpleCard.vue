<script lang="ts" setup>

const props = defineProps({
    title: {type: String, default: ''},
    loading: {type: Boolean, default: false}
})

</script>

<template>
    <div v-on="$listeners" v-if="!props.loading">
        <div                                           
            class="simple-card flex justify-center items-center border border-solid border-slate-200 rounded-lg h-6 w-auto m-2 p-4"
        >
            <p class="text-sm">{{props.title}}</p>
        </div>
    </div>
    <div v-else>
        <div 
            class="flex justify-center items-center border border-solid border-slate-200 rounded-lg h-6 w-full m-2 p-4"
        >
            <div class="bg-gray-300 rounded-md animate-pulse h-6 w-32"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.simple-card {
    &:hover {
        background-color: rgb(247 254 231);
        cursor: pointer;
    }
}
</style>