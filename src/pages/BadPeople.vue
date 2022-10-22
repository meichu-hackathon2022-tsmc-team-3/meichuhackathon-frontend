<template>
  <div class="row">
    <card>
      <h4 class="card-title">事件列表 Event List</h4>
    </card>
    <div class="col-12">
      <base-input label="根據部門搜尋 Search with department" class="text-white" style="padding: 0;">
        <select
          class="form-control bg-dark"
          style="font-size: 1rem;"
          v-model="selected_department"
        >
          <option
            v-for="department in departments"
            :key="department.did"
            :value="department.did"
          >
            {{ department.did }}
          </option>
        </select>
        <br />
      </base-input>
    </div>
      <div
        v-for="event in events"
        :key="'info1-' + event._id"
      >
        <div class="col-4">
          <card style="width: 18rem;">
            <a 
              v-bind:href="`/profile#/profile?id=${event._id}`"
            >
              <img
                slot="image"
                class="card-img-top"
                v-bind:src="event.url"
                alt="Card image cap"
              />
              <p class="card-text">
                辨識結果：
                <span style="color: orange ;" v-if="event.result == 'yellow'">
                  情節輕微</span
                >
                <span style="color: red;" v-if="event.result == 'red'">
                  情節嚴重</span
                >
              </p>

              <p class="card-text">所屬部門：{{ selected_department }}</p>
              <p class="card-text">事件時間：{{ new Date(event.time).toLocaleString() }}</p>
              <!-- <a href="#" class="btn btn-primary">通知他主管</a> -->
              <base-button
                type="primary"
                block
                @click="notifyVue('top', 'center')"
                >通知主管</base-button
              >
            </a>
          </card>
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
  watch: {
    selected_department: async function(val) {
      this.users = (await this.$http.get(`${process.env.VUE_APP_USER_MANAGEMENT_URL}/department/did/${val}`)).data.detail.employees;
      this.update();
    }
  },
  data() {
    return {
      info: null,
      end: null,
      start: null,
      events: [],
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      selected_department: {
        did: "D01"
      },
      departments: [],
      users: []
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
    },
    // 拿到所有部門
    async getDepartmentData() {
      this.departments = (await this.$http.get(`${process.env.VUE_APP_USER_MANAGEMENT_URL}/department`)).data.detail;
    },
    // 拿到今天所有的 event
    async update() {
      this.events = [];

      this.AxiosParams = {
        params: {
          uids: JSON.stringify(this.users.map(e => e.uid))
        }
      };
      const events = (await this.$http.get(`${process.env.VUE_APP_EVENT_MANAGEMENT_URL}/event/users`, this.AxiosParams)).data.detail;
      
      
      for (const event of events){
        this.events.push(event);
      }

    }
  },
  created() {
    this.getDepartmentData();
  }
};
</script>
<style>
.form-group .form-control,
.input-group .form-control {
  padding: 6px 15px 6px 15px;
}
</style>
