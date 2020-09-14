<template>
  <div></div>
</template>

<script>
export default {
  auth: false,
  created() {
    this.$auth.logout()
    this.$router.push('/login')
  }
}
</script>
