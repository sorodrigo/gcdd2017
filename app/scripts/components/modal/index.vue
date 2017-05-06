<template src="./modal-template.html"></template>
<style lang="scss" src="./modal-style.scss"></style>
<script>
  import { mapState } from 'vuex';

  export default {
    name: 'modal-component',
    created() {
      window.addEventListener('keyup', this.onKeyup);
    },
    updated() {
      const overflow = this.open ? 'hidden' : 'auto';
      document.querySelector('body').style.overflow = overflow;
    },
    beforeDestroy() {
      window.removeEventListener('keyup', this.onKeyup);
    },
    computed: {
      ...mapState({
        autoSize: ({ modal }) => modal.autoSize,
        header: ({ modal }) => modal.header,
        heading: ({ modal }) => modal.heading,
        footer: ({ modal }) => modal.footer,
        content: ({ modal }) => modal.content,
        props: ({ modal }) => modal.props,
        open: ({ modal }) => modal.open,
      })
    },
    methods: {
      close() {
        this.$store.dispatch('setModal', {
          open: false,
          props: null,
          content: null,
          footer: true,
          heading: null,
          header: true,
          autoSize: false,
        });
      },
      onKeyup(e) {
        if (e.keyCode === 27) this.close();
      },
    },
  };
</script>
