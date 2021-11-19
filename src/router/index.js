import Vue from "vue";
import VueRouter from "vue-router";
import Comments from "../components/Comments";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Comments,
  },
  {
    path: "/:id",
    name: "commentsPage",
    component: Comments,
  },
];

const router = new VueRouter({
  // mode: "history",
  routes,
});

export default router;
