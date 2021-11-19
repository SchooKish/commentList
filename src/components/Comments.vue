<template>
  <v-container class="col-6">
    <v-row class="col-12" justify="center">
      <NewComment />
      <v-card
        class="my-4 px-5 pb-3"
        max-width="600"
        v-for="post in paginatedData()"
        :key="post.id"
      >
        <v-row align="center" style="height: 80px">
          <v-col class="col-1">
            <v-avatar><img :src="post.author.avatar" /></v-avatar>
          </v-col>
          <v-col class="col-6">
            <v-card-title>{{ post.author.name }}</v-card-title>
            <v-card-subtitle class="text-subtitle-1">{{
              post.author.company
            }}</v-card-subtitle>
          </v-col>
          <v-col class="col-5">
            <v-card-subtitle>{{ post.created_at }} </v-card-subtitle>
          </v-col>
        </v-row>
        <v-row>
          <v-card-text class="text-jastify font-weight-bold">
            {{ post.body }}</v-card-text
          >
        </v-row>
      </v-card>
      <v-pagination v-model="page" :length="pageCount()"></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NewComment from "./NewComment";
export default {
  name: "comments",

  components: {
    NewComment,
  },

  data() {
    return {
      page: 1,
      commentsOnPage: 20,
    };
  },

  computed: mapGetters(["allPosts"]),
  methods: {
    ...mapActions(["fetchPosts"]),

    pageCount() {
      if (this.allPosts.length / this.commentsOnPage === 0) {
        return Math.floor(this.allPosts.length / this.commentsOnPage);
      } else {
        return Math.floor(this.allPosts.length / this.commentsOnPage) + 1;
      }
    },

    paginatedData() {
      return this.allPosts.slice(
        this.page - 1,
        this.page + this.commentsOnPage
      );
    },
  },

  watch: {
    $route(to, from) {
      this.$router.replace({ query: { id: this.page } });
    },
  },

  async mounted() {
    this.fetchPosts();
    // this.$router.push({ query: { id: 1 } });
  },
};
</script>

<style lang="scss"></style>
