<template>
    <base-table :data="tableData"
                thead-classes="text-primary">
      <template slot-scope="{row}">
        <td class="text-center">
          <i 
            v-bind:class="`fas fa-angle-${row.done ? 'down' : 'up'}`" 
            v-bind:style="`color:${row.done ? 'green' : 'red'}; opacity:.5`"
          ></i>
        </td>
        <td class="pt-3">
          <p class="title">{{row.title}}</p>
        </td>
        <td class="pt-3">
          <p class="title">{{row.description}}</p>
        </td>
      </template>
    </base-table>
</template>
<script>
  import {BaseTable} from '@/components'
  export default {
    components: {
      BaseTable
    },
    computed: {
      tableData() {
        return this.$t('dashboard.taskList');
      }
    }
  }
</script>
<style>
</style>
