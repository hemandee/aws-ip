<template>
<w-app >
  <Header />
  <Main class="mb8"/>
  
  <Footer />
</w-app>
</template>

<script>
import Main from './components/Main.vue'
import Header from './components/Header'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    Main,
    Header,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
