<template>
  <v-container grid-list-md fill-height class="px-2">
    <v-layout justify-center align-center>
      <v-card elevation="20">
        <v-card-title>
          Complete your TrueView Account Registration
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              :value="email"
              readonly
              label="Email"
              prepend-icon="person"
            />
            <v-text-field
              v-model="password"
              :rules="[rules.password]"
              :type="showPass ? 'text' : 'password'"
              :append-icon="showPass ? 'visibility' : 'visibility_off'"
              @click:append="showPass = !showPass"
              label="Password"
              prepend-icon="lock"
            />
            <v-text-field
              v-model="passwordConfirmation"
              :rules="[rules.confirmPassword]"
              :type="showPass ? 'text' : 'password'"
              label="Password Confirmation"
              prepend-icon="lock"
            />
            <v-text-field
              v-model="firstName"
              :rules="[$validationRules.required]"
              label="First Name"
              prepend-icon="person"
            />
            <v-text-field
              v-model="lastName"
              :rules="[$validationRules.required]"
              label="Last Name"
              prepend-icon="person"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="completeRegistration()"
            :loading="loading"
            color="primary"
            >Register</v-btn
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
      token: null,
      password: null,
      passwordConfirmation: null,
      firstName: null,
      lastName: null,
      showPass: false,
      loading: false,
      fetchTokenLoading: null,
      success: null,
      exception: null
    }
  },
  computed: {
    email() {
      return this.token == null ? null : this.token.identity
    },
    tokenGuid() {
      return this.$route.query.token
    },
    rules() {
      return {
        password: (value) => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,255}$/
          return (
            pattern.test(value) ||
            'Invalid password! Must contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special characters.'
          )
        },
        confirmPassword: (value) => {
          return value === this.password || 'Passwords not matching!'
        }
      }
    }
  },
  created() {
    // fetch info about the token
    this.fetchTokenLoading = true
    this.$axios
      .get('/auth/token-info', {
        params: {
          token: this.tokenGuid
        }
      })
      .then((response) => {
        this.token = response.data
      })
      .catch((ex) => {
        this.token = null
      })
      .finally(() => {
        this.fetchTokenLoading = false
      })
  },
  methods: {
    completeRegistration() {
      this.loading = true
      this.$axios
        .post(
          `/auth/complete-registration`,
          {
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName
          },
          {
            params: {
              token: this.tokenGuid
            }
          }
        )
        .then((response) => {
          this.success = true
          console.info('Registration created')
          this.$notify(
            'Your account has been created! Proceeding to Login now...'
          )
          this.$router.push('/login')
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
