<template src="./profile-template.html"></template>
<style lang="scss" src="./profile-style.scss"></style>
<script>
  export default {
    name: 'profile-component',
    props: {
      name: {
        type: String
      },
      email: {
        type: String
      }
    },
  };
</script>
