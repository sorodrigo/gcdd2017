<template src="./login-template.html"></template>
<style lang="scss" src="./login-style.scss"></style>
<script>
  import { mapState } from 'vuex';

  export default {
    name: 'login-component',
    data() {
      return {
        username: '',
        password: ''
      };
    },
    computed: {
      ...mapState({
        loggedIn: state => state.authentication.loggedIn
      })
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('authenticate', {
          username: this.username,
          password: this.password
        });
      }
    },
    watch: {
      loggedIn() {
        if (this.loggedIn) this.$router.replace('/profile');
      }
    }
  };
</script>
