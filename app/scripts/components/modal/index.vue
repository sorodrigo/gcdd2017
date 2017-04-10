<template src="./modal-template.html"></template>
<style lang="scss" src="./modal-style.scss"></style>
<script>
  import { mapState } from 'vuex';

  export default {
    name: 'modal-component',
    created() {
      window.addEventListener('keyup', this.onKeyup);
    },
    beforeDestroy() {
      window.removeEventListener('keyup', this.onKeyup);
    },
    data() {
      return {
        header: true,
        heading: null,
        footer: true,
        content: null,
        props: null,
        open: true,
      };
    },
    computed: {
      ...mapState(['header', 'heading', 'footer', 'content', 'props', 'open']),
    },
    methods: {
      close() {
        this.open = false;
      },
      onKeyup(e) {
        if (e.keyCode === 27) this.close();
      },
    },
  };
</script>
