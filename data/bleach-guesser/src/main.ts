import './assets/main.css'

import { createApp } from 'vue'

import { createRouter, createMemoryHistory} from 'vue-router';
import App from './App.vue'
import Home from '@/views/Home.vue';
import GuessAnime from './components/GuessAnime.vue';
import GuessManga from './components/GuessManga.vue';
import GuessCharacter from './components/GuessCharacter.vue';



const routes = [
    { path: '/', component: Home },
    { path: '/anime', component: GuessAnime },
    { path: '/manga', component: GuessManga},
    { path: '/character', component: GuessCharacter},
    ]

    const router = createRouter({
    history: createMemoryHistory(),
    routes,
    })

const app = createApp(App).use(router).mount('#app');
