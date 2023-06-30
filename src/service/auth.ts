import API from './API'
import { User } from "@/type/index"
import { getUsername } from '@/utils/authUtil'

export async function login(username: string, password: string): Promise<User> {
    return await API().get(`/users?username=${username}&password=${password}`).then(response => {
        if (!response.data.err && response.data.length > 0) {
            return response.data[0];
        }
        if (!response.data.err && response.data.length === 0) {
            throw {
                message: 'نام کاربری یا رمز عبور اشتباه است'
            }
        }
        else {
            throw {
                message: 'Server Error'
            }
        }
    })
}

export async function isLoggedIn(): Promise<User> {
    return await API().get(`/users?username=${getUsername()}`).then(response => {
        if (!response.data.err && response.data.length > 0) {
            return response.data[0];
        }
        if (!response.data.err && response.data.length === 0) {
            throw {
                message: 'User not found'
            }
        }
        else {
            throw {
                message: 'Server Error'
            }
        }
    })
}