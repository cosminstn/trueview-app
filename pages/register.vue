<template>
  <!-- Layout fetched from https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/layouts/layouts/demos/centered.vue -->
  <!-- Fara class="ma-0" nu se centreaza bine, lasa spatiu in dreapta -->
  <v-row align="center" justify="center" class="ma-0">
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-card class="elevation-12">
        <v-toolbar color="accent" dark flat>
          <v-toolbar-title>Create a TrueView Account</v-toolbar-title>
          <!-- <v-spacer /> -->
          <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn :href="source" icon large target="_blank" v-on="on">
                <v-icon>mdi-code-tags</v-icon>
              </v-btn>
            </template>
            <span>Source</span>
          </v-tooltip> -->
          <!-- <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                large
                href="https://codepen.io/johnjleider/pen/pMvGQO"
                target="_blank"
                v-on="on"
              >
                <v-icon>mdi-codepen</v-icon>
              </v-btn>
            </template>
            <span>Codepen</span>
          </v-tooltip> -->
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="Email"
              prepend-icon="email"
              type="text"
              :rules="[rules.required, rules.email]"
            />
            <v-text-field
              v-model="password"
              label="Password"
              prepend-icon="lock"
              type="password"
              :rules="[rules.required, rules.password]"
            />
            <v-text-field
              v-model="passwordConfirmation"
              label="Confirm Password"
              prepend-icon="lock"
              type="password"
              :rules="[rules.passwordConfirmation]"
            />
            <v-text-field
              v-model="firstName"
              label="First Name"
              prepend-icon="person"
              type="text"
            />
            <v-text-field
              v-model="lastName"
              label="Last Name"
              prepend-icon="person"
              type="text"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="register">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Register',
  layout: 'auth',
  auth: 'guest',
  data() {
    return {
      username: null,
      password: null,
      passwordConfirmation: null,
      firstName: null,
      lastName: null,
      showpass: false,
      rules: {
        required: (value) => !!value || 'Required!',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid email!'
        },
        passwordConfirmation: (value) => {
          if (
            (this.password != null && value == null) ||
            value !== this.password
          ) {
            return "Passwords don't match"
          }
        }
      }
    }
  },
  methods: {
    login() {
      this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password
        }
      })
    }
  }
}
</script>
