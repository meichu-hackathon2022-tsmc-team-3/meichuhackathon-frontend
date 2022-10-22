<template>
  <div class="row">
    <card>
      <h4 class="card-title">事件列表</h4>
      <p class="card-text">要戴安全帽RR</p>
      <a href="#" class="btn btn-primary">前往其他頁面/通知所有人的主管</a>
    </card>
    <div class="col-12">
      <base-input label="根據部門搜尋" class="text-white" style="padding: 0;">
        <select
          class="form-control bg-dark"
          style="font-size: 1rem;"
          v-model="selected_department"
        >
          <option value="all">全選</option>
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
    <!-- 列出所有部門 -->
    <!-- <h3>{{ selected_department }}</h3> -->
    <div v-if="selected_department == 'all'">
      <div
        v-for="event in eventid_list.event_detail"
        :key="'info1-' + event.uid"
      >
        <div class="col-4">
          <card style="width: 18rem;">
            <img
              slot="image"
              class="card-img-top"
              v-bind:src="event.url"
              alt="Card image cap"
            />
            <h4 class="card-title">員工編號：{{ event.uid }}</h4>
            <h4 class="card-text">員工姓名：{{ event.user.name }}</h4>
            <p class="card-text">
              辨識結果：
              <span style="color:green ;" v-if="event.result == 'pass'">
                {{ event.result }}</span
              >
              <span style="color: red;" v-if="event.result == 'denied'">
                {{ event.result }}</span
              >
            </p>

            <p class="card-text">所屬部門：{{ selected_department }}</p>
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
    <div>
      <!-- <h1>{{ selected_department }}</h1> -->
      <div v-for="event in eventid_list.event_detail" :key="event.uid">
        <!-- <h2>{{ event }}</h2> -->
        <div v-if="event.user.departments[0] == selected_department">
          <div class="col-4">
            <card style="width: 18rem;">
              <img
                slot="image"
                class="card-img-top"
                v-bind:src="event.url"
                alt="Card image cap"
              />
              <h4 class="card-title">員工編號：{{ event.uid }}</h4>
              <h4 class="card-text">員工姓名：{{ event.user.name }}</h4>

              <p class="card-text">
                辨識結果：
                <span style="color:green ;" v-if="event.result == 'pass'">
                  {{ event.result }}</span
                >
                <span style="color: red;" v-if="event.result == 'denied'">
                  {{ event.result }}</span
                >
              </p>
              <p class="card-text">所屬部門：{{ selected_department }}</p>
              <p class="card-text">違規時間：{{ event.time }}</p>
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
      info: null,
      end: null,
      start: null,
      eventid_list: {
        event_detail: {}
      },
      type: ["", "info", "success", "warning", "danger"],
      notifications: {
        topCenter: false
      },
      selected_department: {
        did: "D01"
      },
      departments: []
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
      const url = "http://localhost:5000/api/v1/department";
      let res = await this.$http.get(url);
      this.departments = res.data.detail;
      console.log(this.departments);
    },
    // 拿到今天所有的 event
    async getEvent() {
      this.start = new Date();
      this.end = new Date();
      this.start.setTime(this.start.getTime() - 3600 * 1000 * 24);
      this.end.setTime(this.end.getTime() + 3600 * 1000 * 24);
      const url = "http://localhost:5100/api/v1/event/time";
      this.AxiosParams = {
        params: {
          start: this.start,
          end: this.end
        }
      };
      let res = await this.$http.get(url, this.AxiosParams);

      this.eventid_list.event_detail = res.data.detail;
      const url_user = "http://localhost:5000/api/v1/user/uid";
      for (let i = 0; i < this.eventid_list.event_detail.length; i++) {
        const uid = this.eventid_list.event_detail[i].uid;
        let res_user = await this.$http.get(url_user + `/${uid}`);
        this.eventid_list.event_detail[i].user = res_user.data.detail;
      }
    }
  },
  created() {
    this.getDepartmentData();
    this.getEvent();
  }
};
</script>
<style>
.form-group .form-control,
.input-group .form-control {
  padding: 6px 15px 6px 15px;
}
</style>
