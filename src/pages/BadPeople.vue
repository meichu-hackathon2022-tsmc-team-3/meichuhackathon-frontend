<template>
  <div class="row">
    <card>
      <h4 class="card-title">沒戴安全帽的人</h4>
      <p class="card-text">要戴安全帽RR</p>
      <a href="#" class="btn btn-primary">前往其他頁面/通知所有人的主管</a>
    </card>
    <div class="col-12">
      <base-input label="根據部門搜尋" class="text-white">
        <select class="form-control bg-dark" v-model="selected_department">
          <option value="所有部門">全選</option>
          <option v-for="(people) in peopleData" :key="people.department">
            {{ people.department }}</option
          >
        </select>
        <br />
        <div class="text-white">選擇的部門是： {{ selected_department }}</div>
      </base-input>
    </div>
    <div v-if="selected_department == '所有部門'">
      <div v-for="people in peopleData" :key="people.id">
        <div class="col-4">
          <card style="width: 18rem;">
            <img
              slot="image"
              class="card-img-top"
              v-bind:src="people.pic"
              alt="Card image cap"
            />
            <h4 class="card-title">{{ people.name }}</h4>
            <p class="card-text">所屬部門：{{ people.department }}</p>
            <!-- <a href="#" class="btn btn-primary">通知他主管</a> -->
            <base-button
              type="primary"
              block
              @click="notifyVue('top', 'center')"
              >通知主管</base-button
            >
          </card>
        </div>
      </div>
    </div>
    <div v-for="people in peopleData" :key="people.id">
      <div v-if="people.department == selected_department">
        <div class="col-4">
          <card style="width: 18rem;">
            <img
              slot="image"
              class="card-img-top"
              v-bind:src="people.pic"
              alt="Card image cap"
            />
            <h4 class="card-title">{{ people.name }}</h4>
            <p class="card-text">所屬部門：{{ people.department }}</p>
            <!-- <a href="#" class="btn btn-primary">通知他主管</a> -->
            <base-button
              type="primary"
              block
              @click="notifyVue('top', 'center')"
              >通知主管</base-button
            >
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NotificationTemplate from "./Notifications/NotificationTemplate";
import { BaseAlert } from "@/components";
export default {
  components: {
    BaseAlert
  },
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      selected_department: "部門1",
      peopleData: [
        {
          id: 1,
          name: "沒戴安全帽人1",
          pic: "https://fakeimg.pl/250/",
          department: "部門1"
        },
        {
          id: 2,
          name: "沒戴安全帽人2",
          pic: "https://fakeimg.pl/250/",
          department: "部門2"
        },
        {
          id: 3,
          name: "沒戴安全帽人3",
          pic: "https://fakeimg.pl/250/",
          department: "部門3"
        },
        {
          id: 4,
          name: "沒戴安全帽人4",
          pic: "https://fakeimg.pl/250/",
          department: "部門1"
        },
        {
          id: 4,
          name: "沒戴安全帽人4",
          pic: "https://fakeimg.pl/250/",
          department: "部門1"
        },
        {
          id: 4,
          name: "沒戴安全帽人4",
          pic: "https://fakeimg.pl/250/",
          department: "部門1"
        },{
          id: 4,
          name: "沒戴安全帽人4",
          pic: "https://fakeimg.pl/250/",
          department: "部門1"
        }
      ]
    };
  },
  methods: {
    notifyVue(verticalAlign, horizontalAlign) {
      const color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        component: NotificationTemplate,
        icon: "tim-icons icon-bell-55",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color],
        timeout: 0,
        message: "已通知!!!!"
      });
    }
  },
  computed: {}
};
</script>
<style></style>
