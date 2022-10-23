<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form :model="model"> </edit-profile-form>
    </div>
    <div class="col-md-4">
      <user-card :user="model"></user-card>
    </div>
  </div>
</template>
<script>
import EditProfileForm from "./Profile/EditProfileForm";
import UserCard from "./Profile/UserCard";
export default {
  components: {
    EditProfileForm,
    UserCard,
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async init() {
      const id = this.$route.query.id;
      const event = (
        await this.$http.get(`http://event.tsmc.n0b.me/api/v1/event/id/${id}`)
      ).data.detail;
      const user = (
        await this.$http.get(
          `http://user.tsmc.n0b.me/api/v1/user/uid/${event.uid}`
        )
      ).data.detail || { name: "", uid: "" };

      this.model = {
        id: event._id,
        url: event.url,
        result:
          event.result == "yellow"
            ? `${user.name} 在進入施工區未著裝完成`
            : "偵測到有人在施工區未戴安全帽",
        time: new Date(event.time).toLocaleString(),
      };

      console.log(this.model);
    },
  },
  created() {
    this.init();
  },
};
</script>
<style></style>
