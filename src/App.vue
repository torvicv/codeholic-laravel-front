<script>
import { computed } from 'vue';
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
  <HelloWorld />
  <router-view />
</template>
