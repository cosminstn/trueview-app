<template>
  <v-container grid-list-md fill-height class="px-2">
    <v-layout justify-center align-center>
      <v-card elevation="20" min-width="400">
        <v-card-title>
          TrueView <v-divider vertical class="mx-2" /> Login
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="username"
              label="Username"
              prepend-icon="person"
            />
            <v-text-field
              v-model="password"
              :append-icon="showpass ? 'visibility' : 'visibility_off'"
              :type="showpass ? 'text' : 'password'"
              name="input-10-1"
              prepend-icon="lock"
              label="Password"
              @click:append="showpass = !showpass"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn :loading="loading" color="primary" @click="login()"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'login',
  auth: 'guest',
  data() {
    return {
      username: null,
      password: null,
      showpass: false,
      loading: null
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
