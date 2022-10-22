<template>
  <card type="user">
    <p class="card-text">
    </p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="#">
        <img
              slot="image"
              class="card-img-top"
              v-bind:src="user.url"
              alt="Card image cap"
            />
        <h5 class="title">Image</h5>
      </a>
      <p class="description">
        At tsmc
      </p>
    </div>
    <p></p>
  </card>
</template>
<script>
  export default {
    props: {
      user: {
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
