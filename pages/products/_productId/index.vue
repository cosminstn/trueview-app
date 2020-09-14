<template>
  <v-card v-if="product != null">
    <v-card-title>{{ product.title }}</v-card-title>
    <v-card-text>
      <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(picture, i) in productPictures" :key="i">
          <v-img :src="picture.source" :height="300" contain></v-img>
        </v-carousel-item>
      </v-carousel>

      <v-row align="center">
        <v-rating
          readonly
          :value="productScore == null ? null : productScore.score"
          half-increments
          background-color="orange lighten-3"
          color="orange"
          medium
          dense
          class="px-2"
        ></v-rating>
        <span class="px-2"
          >{{ productScore == null ? '' : productScore.score }} (
          {{ productScore == null ? 0 : productScore.noReviews }} reviews )
        </span>
      </v-row>

      <v-row>
        <v-col>
          <v-dialog
            v-if="product != null"
            v-model="placeReviewDialog"
            max-width="500"
            ><PlaceReview
              :key="placeReviewUpdates"
              :gtin="product.universalProductCode"
              @success="
                placeReviewDialog = false
                getProductReviews(product.universalProductCode)
                placeReviewUpdates
              "
          /></v-dialog>
          <v-btn @click="placeReviewDialog = true">Place Review</v-btn>

          <v-card
            v-for="review in productReviews"
            :key="review.id"
            class="my-2"
          >
            <v-card-title>
              <v-rating
                readonly
                :value="review.score"
                half-increments
                background-color="orange lighten-3"
                color="orange"
                small
                dense
                class="pr-2"
              />

              {{ review.title }}
            </v-card-title>
            <v-card-text>{{ review.content }} </v-card-text>
            <v-card-actions>
              <div
                v-if="review.authorUsername != null"
                justify="center"
                class="mx-2"
              >
                <v-icon small>person</v-icon>{{ review.authorUsername }}
              </div>
              <div justify="center">
                <v-icon small>schedule</v-icon>
                {{ toLocalDateTime(review.createdOn) }}
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
const { DateTime } = require('luxon')
export default {
  components: {
    PlaceReview: () => import('~/components/PlaceReview')
  },
  data() {
    return {
      product: null,
      productPictures: [],
      productReviews: [],
      productScore: null,
      loadingScore: false,
      placeReviewDialog: false,
      placeReviewUpdates: 0
    }
  },
  computed: {
    productId() {
      return this.$route.params.productId
    }
  },
  created() {
    this.$axios
      .get(`/product/${this.productId}`)
      .then((response) => {
        this.product = response.data
        this.getProductPictures()
        this.getProductScore(this.product.universalProductCode)
        this.getProductReviews(this.product.universalProductCode)
      })
      .catch((ex) => {
        console.error('Could not fetch product: ' + this.productId, ex)
      })
  },
  methods: {
    getProductPictures() {
      this.loadingPictures = true
      this.$axios
        .get(`/product/${this.productId}/pictures`)
        .then((response) => {
          this.productPictures = response.data
        })
        .catch((ex) => {
          this.productPictures = []
          console.error('Could not fetch product pictures: ', ex)
        })
        .finally(() => {
          this.loadingPictures = false
        })
    },
    /**
     * @param {String} gtin - gtin = Global Trade Item Number
     */
    getProductReviews(gtin) {
      this.$axios
        .get(`/review/gtin/${gtin}/search`)
        .then((response) => {
          this.productReviews = response.data.items
          this.productReviews = this.productReviews.filter(
            (review) => review.title != null
          )
        })
        .catch((ex) => {
          console.error(
            'Could not fetch product reviews for product: ' + this.ProductId,
            ex
          )
        })
        .finally(() => (this.loadingReviews = false))
    },
    /**
     * @param {String} gtin - gtin = Global Trade Item Number
     */
    getProductScore(gtin) {
      this.loadingScore = true
      this.$axios
        .get(`/review/gtin/${gtin}/score`)
        .then((response) => {
          this.productScore = response.data
        })
        .catch((ex) => {
          console.error('Could not fetch product score for: ' + this.gtin, ex)
        })
        .finally(() => (this.loadingScore = false))
    },
    toLocalDateTime(dateTime) {
      return DateTime.fromISO(dateTime).toFormat('dd-LL-yyyy HH:mm:ss')
    }
  }
}
</script>
