import api from "./api";

export default {
     login(payload) {
        return new Promise((resolve, reject) => {
            api.post('/api/login', payload).then(
                success => resolve(success),
                error => reject(error)
            )
        })
    },

    logout() {
        return new Promise((resolve, reject) => {
            api.delete('/api/logout').then(
                success => resolve(success),
                error => reject(error)
            )

        })
    },

    getActivities() {
        return new Promise((resolve, reject) => {
            api.get('/api/activities').then(
                success => resolve(success),
                error => reject(error)
            )
        })
    },

    addActivity(payload) {
        return new Promise((resolve, reject) => {
            api.post('/api/activity/store', payload).then(
                success => resolve(success),
                error => reject(error)
            )
        })
    },

    deleteActivity(id) {
        return new Promise((resolve, reject) => {
            api.delete(`/api/activity/${id}`).then(
                success => resolve(success),
                error => reject(error)
            )
        })
    },

    updateActivity(id, payload) {
        return new Promise((resolve, reject) => {
            api.put(`/api/activity/${id}`, payload).then(
                success => resolve(success),
                error => reject(error)
            )
        })
    }
};
