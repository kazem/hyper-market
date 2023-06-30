import { defineStore } from 'pinia'
import { User, ServerState } from "@/type/index"
import { login, isLoggedIn } from "@/service/auth"


export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            currentUser: null as User | null,
            serverState: ServerState.NONE as ServerState,
            isLoggedIn: false as Boolean,
            errorMessage: '' as String
        }
    },
    actions: {
        async login(username: string, password: string) {
            this.setServerState(ServerState.PENDING)
            try {
                this.currentUser = await login(username, password)
                this.isLoggedIn = true;
                localStorage.setItem('username', this.currentUser.username)
                localStorage.setItem('userId', this.currentUser.id)
                this.setServerState(ServerState.SUCCESSFUL)
            }
            catch (e: any) {
                console.log('catch: ', e);
                this.isLoggedIn = false;
                this.setServerState(ServerState.ERROR)
                this.errorMessage = e.message;
                // sessionStorage.clear();
                // localStorage.clear();
            }
        },

        async isLoggedin() {
            this.setServerState(ServerState.PENDING)
            try {
                this.currentUser = await isLoggedIn()
                this.isLoggedIn = true;
                localStorage.setItem('username', this.currentUser.username)
                localStorage.setItem('userId', this.currentUser.id)
                this.setServerState(ServerState.SUCCESSFUL)
            }
            catch (e) {
                console.log('catch: ', e);
                this.isLoggedIn = false;
                this.setServerState(ServerState.ERROR)
                // sessionStorage.clear();
                // localStorage.clear();
            }
        },

        setServerState(serverState: ServerState) {
            this.serverState = serverState
        },
    }
})