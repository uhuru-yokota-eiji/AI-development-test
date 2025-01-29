<template>
  <div id="app">
    <h1>キーワード検索</h1>
    <input type="text" v-model="keyword" placeholder="キーワードを入力" />
    <button @click="search">検索</button>
    <ul>
      <li v-for="result in results" :key="result.id">
        <a :href="result.link" target="_blank">{{ result.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      keyword: '',
      results: []
    };
  },
  methods: {
    async search() {
      try {
        const response = await fetch(`/api/search?keyword=${encodeURIComponent(this.keyword)}`);
        this.results = await response.json();
      } catch (error) {
        console.error('検索エラー:', error);
      }
    }
  }
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>