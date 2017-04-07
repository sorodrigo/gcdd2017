<template src="./header-template.html"></template>
<style lang="scss" src="./header-style.scss"></style>
<script>
  import NavMenu from 'components/nav-menu';

  export default {
    name: 'header-component',
    props: {
      expanded: {
        type: Boolean,
        default: false,
      }
    },
    components: {
      NavMenu,
    },
  };
</script>
