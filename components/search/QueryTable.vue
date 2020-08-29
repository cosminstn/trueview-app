<template>
  <div>
    <v-card-title
      ><v-col>
        <v-row v-if="title != null && title !== undefined">{{ title }}</v-row>
        <v-row>
          <v-text-field
            v-if="allowSearch === true"
            v-model="search"
            clearable
            append-icon="search"
            label="Search"
          />
        </v-row>
      </v-col>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="rows"
      :options.sync="pagination"
      :server-items-length="totalItems"
      :loading="loading"
      @click:row="rowClick"
    />
  </div>
</template>

<script>
/* eslint-disable no-console */
const _ = require('lodash')

export default {
  props: {
    apiController: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    allowSearch: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      rows: [],
      search: null,
      pagination: {
        itemsPerPage: 10 // needs fixing in
      },
      totalItems: null,
      loading: false
    }
  },
  watch: {
    search() {
      this.throttledRefreshData()
    },
    pagination: {
      deep: true,
      immediate: true,
      handler() {
        this.throttledRefreshData()
      }
    }
  },
  created() {
    this.refreshData()
    this.debouncedGetData = _.debounce(this.refreshData, 500)
  },

  methods: {
    debouncedRefreshData: _.debounce(function() {
      this.refreshData()
    }, 500),
    throttledRefreshData: _.throttle(function() {
      this.refreshData()
    }, 300),
    refreshData() {
      const endpoint =
        this.allowSearch &&
        !(
          this.apiController.endsWith('/search') ||
          this.apiController.endsWith('/search/')
        )
          ? `/${this.apiController}/search`
          : `/${this.apiController}`

      if (this.loading) {
        return
      }

      this.loading = true
      this.$axios
        .get(endpoint, {
          params: {
            query: this.search,
            pageIndex: this.pagination.page,
            pageSize: this.pagination.itemsPerPage
          }
        })
        .then((response) => {
          this.rows = response.data.items
          this.pagination.page = response.data.pageIndex
          this.pagination.itemsPerPage = response.data.pageSize
          this.totalItems = response.data.totalItems
        })
        .catch((err) => {
          console.log(
            `Could not fetch data from controller: ${this.apiController} `
          )
          console.error(
            `Could not refresh data in QueryTable from controller: ${this.apiController}`,
            err
          )
          this.rows = []
        })
        .finally(() => {
          this.loading = false
        })
    },
    rowClick(row) {
      this.$emit('row-clicked', row)
    }
  }
}
</script>
