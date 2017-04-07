<template src="./modal-template.html"></template>
<style lang="scss" src="./modal-style.scss"></style>
<script>
  import { mapState } from 'vuex';

  export default {
    name: 'modal-component',
    data() {
      return {
        content: null,
        props: null,
        open: true,
      };
    },
    computed: {
      ...mapState(['content', 'open', 'props']),
    },
    methods: {
      close() {
        this.open = false;
      },
    },
  };
</script>
