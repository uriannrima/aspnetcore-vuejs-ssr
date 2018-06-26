<template>
  <div>
    <h2>Foo Component:</h2>
    <h3>{{ fooCount }}</h3>
    <button v-on:click="increase">Increase</button>
  </div>
</template>

<script>
import fooStoreModule from '../store/modules/foo';

export default {
  asyncData({ store }) {
    store.registerModule('foo', fooStoreModule);
    return store.dispatch('foo/inc');
  },

  destroyed() {
    this.$store.unregisterModule('foo');
  },

  methods: {
    increase() {
      this.$store.dispatch('foo/inc');
    }
  },
  computed: {
    fooCount() {
      return this.$store.state.foo.count;
    }
  }
};
</script>
