<template src="./login-template.html"></template>
<style lang="scss" src="./login-style.scss"></style>
<script>
  import { mapState } from 'vuex';

  export default {
    name: 'login-component',
    created() {
      if (this.loggedIn) this.$router.replace('/profile');
    },
    data() {
      return {
        username: '',
        password: ''
      };
    },
    computed: {
      ...mapState({
        loggedIn: state => state.authentication.loggedIn,
        userDetails: state => state.authentication.payload
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
