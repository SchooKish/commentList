import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    author: {
      id: 16,
      name: "John Doe",
      avatar: "http://placeimg.com/640/480/business",
      company: "BigCountry",
    },
  },
  getters: {
    allPosts(state) {
      return state.posts;
    },
  },
  actions: {
    async fetchPosts(ctx) {
      const api = await fetch(
        "https://bigcountry-task.vercel.app/comments.json"
      );
      const posts = await api.json();
      posts.forEach((el) => {
        const fullDate = new Date(Date.parse(el.created_at));
        const newDate =
          fullDate.getDate() +
          " " +
          ctx.state.months[fullDate.getMonth()] +
          " " +
          fullDate.getFullYear() +
          ", at " +
          fullDate.getHours() +
          ":" +
          fullDate.getMinutes();
        el.created_at = newDate;
      });
      ctx.commit("updatePosts", posts);
    },

    newComment(ctx, text) {
      const today = new Date();
      const formatDate =
        today.getDate() +
        " " +
        ctx.state.months[today.getMonth()] +
        " " +
        today.getFullYear() +
        ", at " +
        today.getHours() +
        ":" +
        today.getMinutes();
      const newComm = {
        id: ctx.state.posts.length + 1,
        body: text,
        created_at: formatDate,
        author: ctx.state.author,
      };
      ctx.commit("pushComment", newComm);
    },
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts;
    },

    pushComment(state, newComment) {
      state.posts.unshift(newComment);
    },
  },
});
