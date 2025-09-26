import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import PokemonDetails from "@/views/PokemonDetails.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/:id", name: "PokemonDetails", component: PokemonDetails, props: true },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
