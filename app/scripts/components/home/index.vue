<template src="./home-template.html"></template>
<style lang="scss" src="./home-style.scss"></style>
<script>
  import { mapState } from 'vuex';
  import VueMarkdown from 'vue-markdown';
  import { home } from 'app/datasource.schema.json';

  export default {
    name: 'home-component',
    created() {
      if (!this.content && home.resolveContent) {
        this.$store.dispatch('fetchBlob', home.resolveContent);
      }
    },
    computed: {
      ...mapState({
        content: state => (state.markdown.blobs[home.resolveContent] || home.content || '')
      })
    },
    components: {
      VueMarkdown
    }
  };
</script>
