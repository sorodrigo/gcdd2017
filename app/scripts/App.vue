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

<style lang="scss">
  @import '../styles/settings';

  .l-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: transparent;
    height: $header-height;
  }

  .l-main {
    position: relative;
    height: calc(100% - #{$header-height});
    width: 100%;
    top: $header-height;
  }
</style>

