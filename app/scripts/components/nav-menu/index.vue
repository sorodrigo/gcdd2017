<template src="./nav-menu-template.html"></template>
<style lang="scss" src="./nav-menu-style.scss"></style>
<script>
  export default {
    name: 'nav-menu-component',
    props: {
      title: {
        type: String,
        required: true,
      },
      open: {
        type: Boolean,
        default: false
      },
      toggle: {
        type: Function,
        required: true
      }
    },
  };
</script>
