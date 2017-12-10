<template src="./profile-template.html"></template>
<style lang="scss" src="./profile-style.scss"></style>
<script>
  import { mapState } from 'vuex';

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
    computed: {
      ...mapState({
        details: (state) => {
          const { id, password, ...details } = state.authentication.payload || {};
          return details;
        }
      })
    }
  };
</script>
