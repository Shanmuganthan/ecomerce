import Service from './index'

export const login = (data) => {
    return Service.post('users/login',data)
}

export const getCurrentLoginUser = () => {
    return Service.get('users')
}

export const register = (data) => {
    return Service.post('users/login',data)
}

