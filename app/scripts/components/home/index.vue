<template src="./home-template.html"></template>
<style lang="scss" src="./home-style.scss"></style>
<script>
  import VueMarkdown from 'vue-markdown';
  import { home } from 'app/datasource.schema.json';

  export default {
    name: 'home-component',
    created() {
      fetch(home.resolveContent)
        .then((res) => {
          if (res.ok) return res.text();
          throw new Error(`${home.resolveContent} ${res.statusText}`);
        })
        .then((text) => {
          this.content = text;
        })
        .catch((err) => {
          console.error(err);
          this.content = home.content || '';
        });
    },
    data() {
      return {
        content: home.content
      };
    },
    components: {
      VueMarkdown
    }
  };
</script>
