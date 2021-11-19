<template>
  <v-card class="px-4 pb-4 new-comment">
    <v-card-title> Новый комментарий </v-card-title>
    <v-textarea
      counter
      solo
      label="Ваш комментарий"
      v-model="text"
    ></v-textarea>
    <v-btn block elevation="2" @click="newComment(text), clear()"
      >Отправить</v-btn
    >
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "newComment",

  data() {
    return {
      text: "",
      rules: {
        // textarea: (v) => !!(v || "").match(),
      },
    };
  },

  computed: mapGetters(["allPosts"]),

  methods: {
    ...mapActions(["newComment"]),
    clear() {
      this.text = "";
    },
  },

  mounted() {},
};
</script>

<style lang="scss">
.new-comment {
  width: 100%;
}
</style>
