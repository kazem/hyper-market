<script lang="ts" setup>
import {useAuthStore} from '@/store/auth'
import { ref, reactive, onMounted } from 'vue';
import { VTextField, VBtn, VSnackbar } from 'vuetify/lib/components'
 import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import {useRouter} from 'vue-router/composables'
const router = useRouter()


// const usernameRules = ref({
    //     required: (value: any) => !!value || 'نام کاربری خالی است',
//     length: (value: string) => (value?.length <= 12 && value?.length >= 8 ) || 'تعداد کارکتر بین 8 تا 12 باشد'
// })
const authStore = useAuthStore();
const login = async () => {          
    await authStore.login(formData.username, formData.password)
    if(authStore.isLoggedIn){       
        router.push('/stores')
    }
}

const rules = {
    required: helpers.withMessage('مقدار خالی است', required),
    minLength: helpers.withMessage('تعداد کارکتر باید بین 8 تا 12 باشد', minLength(8)),
    maxLength: helpers.withMessage('تعداد کارکتر باید بین 8 تا 12 باشد', maxLength(12))
}
const fieldRules = {
    username: { ...rules },
    password: { ...rules },
  }

const formData = reactive({username: '', password: ''})
  const v$ = useVuelidate( fieldRules , formData)
</script>

<template>
    <form class="login-page" @submit.prevent="login()">        
        <div class="login-page_container">
            <VTextField              
                dir="rtl" 
                placeholder="نام کاربری"  
                v-model="formData.username"  
                @input="v$.username.$touch"
                @blur="v$.username.$touch"
                :error-messages="v$.username.$errors.map(e => e.$message)"              
             />           
            <VTextField 
                dir="rtl" 
                placeholder="رمز عبور"
                v-model="formData.password"  
                @input="v$.password.$touch"
                @blur="v$.password.$touch"
                :error-messages="v$.password.$errors.map(e => e.$message)" 
             />
            <div class="login-page_btn">
                <VBtn
                    type="submit"
                    :disabled="v$.$invalid"              
                    :loading="authStore.serverState === 'PENDING' ? true : false"
                >
                    تایید
                </VBtn>
            </div>
        </div>
        <v-snackbar
            :timeout="3000"
            :color="'rgb(255,0,0)'" 
            :value="authStore.serverState === 'ERROR' ? true : false"
        >
            <p v-if="authStore.serverState === 'ERROR'" class="text-center">{{ authStore.errorMessage }}</p>            
        </v-snackbar>
    </form>
</template>

<style lang="scss">
.login-page {    
    margin: auto;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;  

    &_container {
        border-radius: 12px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        padding: 3rem;
        .v-messages__message {
            color: red;
            font-size: 10px;
        }
    }

    &_btn {
        display: flex;
        justify-content: flex-start;
        margin-top: 1rem;
    }

}

</style>


