<template>
  <v-row>
    <v-col
      v-for="product in products"
      :key="product.id"
      xs="12"
      sm="6"
      md="4"
      lg="3"
    >
      <v-card>
        <v-card-title>{{ product.title }}</v-card-title>
        <v-card-text>
          <v-img
            v-if="product.pictures != null && product.pictures.length > 0"
            :src="product.pictures[0].source"
            :height="300"
            contain
          ></v-img>
          <v-sheet v-else class="mx-auto" height="300"></v-sheet>

          <v-row align="center">
            <v-rating
              readonly
              :value="product.score"
              half-increments
              background-color="orange lighten-3"
              color="orange"
              medium
              dense
              class="px-2"
            ></v-rating>
            <span class="px-2">{{ product.score }} ( 1344 reviews ) </span>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      pagination: {
        page: 1,
        itemsPerPage: 20
      },
      totalItems: null,
      loading: null
    }
  },
  computed: {
    categoryId() {
      return this.$route.params.categoryId
    }
  },
  created() {
    // refresh data
    this.refreshData()
  },
  methods: {
    refreshData() {
      this.loading = true
      this.$axios
        .get(`/category/${this.categoryId}/products/search`)
        .then((response) => {
          this.products = response.data.items
          this.products.forEach((product) => {
            this.loadPictures(product)
          })
          this.pagination.page = response.data.pageIndex
          this.pagination.itemsPerPage = response.data.pageSize
          this.totalItems = response.data.totalItems
          // TODO: De ce e product pictures null? Nu inteleg!
        })
        .catch((ex) => {
          console.error(
            `Could not fetch category: ${this.categoryId} products:`,
            ex
          )
        })
        .finally(() => {
          this.loading = false
        })
    },
    /**
     * @param {Object} productId
     */
    loadPictures(product) {
      this.$axios
        .get(`/product/${product.id}/pictures`)
        .then((response) => {
          product.pictures = response.data
        })
        .catch((ex) => {
          console.error('Could not fetch pictures for product: ' + product.id)
        })
    }
  }
}
</script>
