<template src="./home-template.html"></template>
<style lang="scss" src="./home-style.scss"></style>
<script>
  import { mapState } from 'vuex';
  import VueMarkdown from 'vue-markdown';
  import { app } from 'app/datasource.schema.json';

  export default {
    name: 'home-component',
    created() {
      if (!this.content && app.home && app.home.resolveContent) {
        this.$store.dispatch('fetchBlob', app.home.resolveContent);
      }
    },
    computed: {
      ...mapState({
        content: state => ((app.home && state.markdown.blobs[app.home.resolveContent]) || app.home.content || '')
      })
    },
    components: {
      VueMarkdown
    }
  };
</script>
