<template>
  <v-container>
    <v-row>
      <v-col
        v-for="category in categoriesWithProducts"
        :key="category.id"
        cols="12"
      >
        <v-card>
          <v-card-title>{{ category.title }}</v-card-title>
          <v-card-text>
            <v-row :key="category.updates">
              <v-col
                v-for="product in category.products"
                :key="product.id"
                cols="12"
                xs="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card class="elevation-1">
                  <v-card-title>{{ product.title }}</v-card-title>
                  <v-divider />
                  <v-card-text
                    ><v-img
                      v-if="product.mainProductPicture != null"
                      :src="product.mainProductPicture.source"
                      :height="300"
                      contain
                    ></v-img
                  ></v-card-text>
                  <v-card-actions>
                    <v-btn
                      rounded
                      color="primary"
                      @click="$router.push(`/products/${product.id}`)"
                      >Show<v-icon>arrow_right</v-icon></v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col></v-row
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/**
 * Displays max 5 products from each category that has products
 */
export default {
  name: 'DefaultProducts',
  data() {
    return {
      categoriesWithProducts: []
    }
  },
  created() {
    // fetch the categories
    this.$axios
      .get('/category/default-products')
      .then((response) => {
        this.categoriesWithProducts = response.data
      })
      .catch((ex) => {
        console.error('Could not fetch categories', ex)
      })
  },
  methods: {
    getCategoryProducts(category) {
      console.log('Refreshing category products')
      this.$axios
        .get(`/category/${category.id}/products/search`, {
          params: {
            pageIndex: 1,
            pageSize: 5
          }
        })
        .then((response) => {
          category.products = response.data.items
        })
        .catch((ex) => {
          console.error(
            'Could not fetch category products for category: ' + category.id,
            ex
          )
        })
        .finally(() => {
          category.updates++
        })
    }
  }
}
</script>
