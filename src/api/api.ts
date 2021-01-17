import axios from 'axios';

const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {"API-KEY": "2f8b88ce-de54-4bd6-9153-b38ec847d28e"},
    }
)

export const usersAPI = {
    getUsers(page: number, pageSize: number) {
        return instance.get(`users?page=${page}&count=${pageSize}`).then(response => response.data)
    }
}

export const authAPI = {
    authMe() {
        return instance.get('auth/me').then(response => response.data)
    }
}

export const followAPI = {
    follow(id: number) {
        return instance.post('follow/' + id,).then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete('follow/' + id,).then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: string) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(newStatus: string) {
        return instance.put('profile/status', {status: newStatus})
    }
}