import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home-page',
            component: require('@/pages/index').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
