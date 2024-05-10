<script>
import HelloWorld from './components/HelloWorld.vue';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user'])
  },
  components: {
    HelloWorld
  }
}
</script>

<template>
  <router-view />
</template>
