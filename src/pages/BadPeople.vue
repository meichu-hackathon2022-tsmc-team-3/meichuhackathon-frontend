<template>
  <div class="row">
    <card>
      <h4 class="card-title">今天的沒戴安全帽的人</h4>
      <p class="card-text">要戴安全帽RR</p>
      <a href="#" class="btn btn-primary">前往其他頁面/通知所有人的主管</a>
    </card>
    <div class="col-12">
      <base-input label="根據部門搜尋" class="text-white" style="padding: 0;">
        <select
          class="form-control bg-dark"
          style="font-size: 1rem;"
          v-model="selected_department.id"
        >
          <option value="all">全選</option>
          <option
            v-for="department in departmentData"
            :key="department.id"
            :value="department.id"
          >
            {{ department.name }}
          </option>
        </select>
        <br />
      </base-input>
    </div>
    <!-- 列出所有部門 -->
    <div v-if="selected_department.id == 'all'">
      <div v-for="people in peopleData" :key="people.id">
        <div class="col-4 inline-block">
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
    <!-- <h1>{{selected_department}}</h1> -->
    <div v-for="people in peopleData" :key="people.id">
      <div v-if="people.department == selected_department.id">
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
import { BaseAlertCustom } from "@/components";
export default {
  components: {
    BaseAlertCustom
  },
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      selected_department: {
        id: 1,
        name: "部門1"
      },
      departmentData: [
        { id: 1, name: "部門1" },
        { id: 2, name: "部門2" },
        { id: 3, name: "部門3" }
      ],
      peopleData: [
        {
          id: 1,
          name: "沒戴安全帽人1",
          pic: "https://fakeimg.pl/250/",
          department: 1
        },
        {
          id: 2,
          name: "沒戴安全帽人2",
          pic: "https://fakeimg.pl/250/",
          department: 2
        },
        {
          id: 3,
          name: "沒戴安全帽人3",
          pic: "https://fakeimg.pl/250/",
          department: 3
        },
        {
          id: 5,
          name: "沒戴安全帽人4",
          pic: "https://fakeimg.pl/250/",
          department: 1
        },
        {
          id: 6,
          name: "沒戴安全帽人4",
          pic: "https://fakeimg.pl/250/",
          department: 1
        },
        {
          id: 7,
          name: "沒戴安全帽人4",
          pic: "https://fakeimg.pl/250/",
          department: 1
        },
        {
          id: 8,
          name: "沒戴安全帽人4",
          pic: "https://fakeimg.pl/250/",
          department: 1
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
<style>
.form-group .form-control,
.input-group .form-control {
  padding: 6px 15px 6px 15px;
}
</style>
