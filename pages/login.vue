<template>
  <v-container grid-list-md fill-height class="px-2">
    <v-layout justify-center align-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card elevation="20">
          <v-card-title>
            <h1>LOGIN</h1>
          </v-card-title>
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
            label="Parola"
            @click:append="showpass = !showpass"
          ></v-text-field>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="login()">Login</v-btn>
            <!-- <v-btn @click="doLoginOper()">Login Oper1</v-btn>
            <v-btn @click="doLoginUser()">Login User1</v-btn>-->
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
      username: null,
      password: null,
      showpass: false
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
