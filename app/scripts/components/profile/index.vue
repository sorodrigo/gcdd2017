<template src="./profile-template.html"></template>
<style lang="scss" src="./profile-style.scss"></style>
<script>
  import { mapState } from 'vuex';
  import { auth } from '../../datasource.schema.json';

  export default {
    name: 'profile-component',
    computed: {
      ...mapState({
        details: (state) => {
          const password = auth && auth.request && auth.request.password;
          const {
            id,
            [password]: pass,
            ...details
          } = state.authentication.payload || {};
          return details;
        }
      })
    }
  };
</script>
