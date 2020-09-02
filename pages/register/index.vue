<template>
  <v-container grid-list-md fill-height class="px-2">
    <v-layout justify-center align-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card elevation="20">
          <v-card-title>
            Create a TrueView Account
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="email"
              :rules="[$validationRules.email]"
              label="Enter your email (e.g.: john@doe.com)"
              prepend-icon="person"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="register()" :loading="loading" color="primary"
              >Register</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'login',
  auth: 'guest',
  data() {
    return {
      email: null,
      loading: false,
      success: null,
      exception: null
    }
  },
  created() {
    this.$auth.logout()
  },
  methods: {
    register() {
      this.loading = true
      this.$axios
        .post('/auth/register', {
          email: this.email
        })
        .then((response) => {
          this.success = true
          console.info('Registration created')
        })
        .catch((ex) => {
          this.ex = ex.response
          console.error('Could not register email: ' + this.email, ex)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
