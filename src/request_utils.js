import axios from "axios"

export const BASE_PATH = "http://127.0.0.1:8000/weather"

export const SUBSCRIPTIONS_URL = `${BASE_PATH}/users/current/subscriptions/`

export const PROFILE_URL = `${BASE_PATH}/users/current/userprofile/`

export function getHeader() {
    const token = window.localStorage.getItem('token')
    if (!token) {
        // go to login
        window.location.href = `${BASE_PATH}/login`
    }
    return {headers: {Authorization: 'Token ' + token}}
}

export const SUBSCRIPTIONS_IMPORT_URL = `${SUBSCRIPTIONS_URL}import/`