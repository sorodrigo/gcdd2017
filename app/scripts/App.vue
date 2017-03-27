<template>
  <div id="app">
    <header class="l-header">
      <router-view name="header"></router-view>
    </header>
    <main class="l-main">
      <router-view></router-view>
    </main>
    <footer class="l-footer">
      <router-view name="footer"></router-view>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../styles/settings';

  .l-header {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: transparent;
  }

  .l-main {
    position: absolute;
    height: calc(100% - #{$header-height});
    width: 100%;
    margin-top: $header-height;
  }
</style>

