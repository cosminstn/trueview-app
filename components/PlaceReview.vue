<template>
  <v-card :loading="loading">
    <v-card-title>Place review</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-form ref="form" v-model="formValid" lazy-validation>
            <v-row align="center">
              <v-rating
                v-model="review.score"
                half-increments
                background-color="orange lighten-3"
                color="orange"
                medium
                dense
                class="px-2"
                :rules="[$validationRules.required]"
              ></v-rating>
              <span class="px-2">{{ review.score }} </span>
            </v-row>
            <v-text-field
              v-model="review.title"
              counter="50"
              label="Title (short description)"
            />
            <v-textarea
              v-model="review.content"
              counter="1000"
              label="Content (full description)"
              rows="10"
            />
          </v-form>
          <p v-if="exception != null" class="red--text py-0 my-0">
            Exception: {{ exception.message || 'Could not place review! ' }}
          </p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        class="mt-0 pt-0"
        :disabled="!formValid"
        :loading="loading"
        @click="placeReview"
        ><v-icon>add</v-icon>Place</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PlaceReview',
  props: {
    gtin: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      review: {
        score: null,
        title: null,
        content: null
      },
      loading: false,
      formValid: null,
      exception: null
    }
  },
  watch: {
    review: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    placeReview() {
      try {
        this.$refs.form.validate()
      } catch (ex) {}
      if (this.loading) {
        return
      }
      if (!this.formValid) {
        return
      }
      this.loading = true
      this.$axios
        .post(`/review/gtin/${this.gtin}`, this.review, {
          headers: {
            'X-API-KEY': process.env.TRUEVIEW_API_KEY
          }
        })
        .then((response) => {
          this.$emit('success')
        })
        .catch((error) => {
          if (error.response == null || error.response.data == null) {
            this.exception = {
              code: 'review.create.unknownException'
            }
          } else {
            this.exception = error.response.data
          }
          this.$emit('failed', error)
          console.error('Could not place review for gtin: ' + this.gtin, error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
