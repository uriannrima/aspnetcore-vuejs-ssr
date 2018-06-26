<template>
  <div>
    <h2>Item Component:</h2>
    <span>Id: {{item.id}}</span>
    <span>Name: {{item.name}}</span>
  </div>
</template>

<script>
export default {
  // Static asyncData
  // Can be used serverSide
  asyncData({ store, route }) {
    return store.dispatch('fetchItem', route.params.id);
  },

  computed: {
    item() {
      // Get item from store using ID from route parameters.
      return this.$store.state.items[this.$route.params.id];
    }
  }
};
</script>

<style>
</style>
