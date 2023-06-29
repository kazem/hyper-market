import axios from 'axios'

export default (url: string = 'http://localhost:2023') => {
    return axios.create({
        baseURL: url
    })
}

export function SetupAxiosInceptor() {
    axios.interceptors.response.use(function (response) {
        if (response.data.err) {
            let error = {
                code: response.data.err.code,
                msg: ''
            }
            if (error.code === 401) {
                window.localStorage.removeItem('username')
                window.location.href = '/'
            }
            console.log('response.data.err');
            throw {
                ...error
            }
        }
        return response;
    }, function (error) {
        console.log('function (error): ', error);
        return Promise.reject(error);
    });
}