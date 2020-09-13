<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <DefaultProducts />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
    DefaultProducts: () => import('~/components/DefaultProducts')
  }
}
</script>
