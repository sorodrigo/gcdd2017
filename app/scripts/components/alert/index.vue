<template src="./alert-template.html"></template>
<style lang="scss" src="./alert-style.scss"></style>
<script>
  export default {
    name: 'alert-component',
    props: {
      title: {
        type: String,
        required: false,
      },
      subtitle: {
        type: String,
        default: false
      },
      actions: {
        type: Array,
        required: false
      }
    },
  };
</script>
