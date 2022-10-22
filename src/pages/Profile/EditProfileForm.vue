<template>
  <card>
    <h5 slot="header" class="title">Event</h5>
    <div class="mx-3">
      <div class="row">
        <div>
          <h3>事件ID Event ID</h3>
          <h4>{{ model.id }}</h4>
        </div>
      </div>
      <div class="row mt-4">
        <div>
          <h3>事件時間 Event Time</h3>
          <h4>{{ model.time }}</h4>
        </div>
      </div>
      <div class="row mt-4">
        <div>
          <h3>地點 Location</h3>
          <h4>F18 施工區</h4>
        </div>
      </div>
      <div class="row mt-4">
        <div>
          <h3>事件描述 Event Detail</h3>
          <h4>{{ model.result }}</h4>
        </div>
      </div>
    </div>
  </card>
</template>
<script>
  export default {
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    }
  }
</script>
<style>
</style>
