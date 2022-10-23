<template>
  <div class="row">
    <h3>違規次數排行榜</h3>
    <!-- <h3>{{ select_date }}</h3> -->
    <div class="col-12">
      <el-date-picker
        class="bg-dark"
        v-model="select_date"
        type="daterange"
        unlink-panels
        range-separator=">"
        start-placeholder="開始日期"
        end-placeholder="結束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </div>
    <!-- <h2>{{ start_date[0] }}</h2>
    <h2>{{ start_date[1] }}</h2> -->
    <!-- <h3>{{ events }}</h3> -->
    <div class="col-12 mt-5">
      <!-- 可以排序的 -->
      <table class="table">
        <thead>
          <tr>
            <th class="click" @click="changeType('uid')">
              user id
              <span
                class="icon"
                :class="{ inverse: isReverse }"
                v-if="sortType == 'uid'"
              >
                <i class=" fas fa-angle-up text-success"></i>
              </span>
            </th>
            <th>name</th>
            <th>email</th>
            <th class="click" @click="changeType('time')">
              time
              <span
                class="icon"
                :class="{ inverse: isReverse }"
                v-if="sortType == 'time'"
              >
                <i class=" fas fa-angle-up text-success"></i>
              </span>
            </th>
            <th>alert</th>
          </tr>
          <tr v-for="item in events" :key="item.uid">
            <td>{{ item.uid }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.count }}</td>
            <td>
              <base-button
                block
                @click="notifyVue('top', 'center')"
                type="info"
                size="sm"
                icon
                ><i class="tim-icons icon-chat-33"></i
              ></base-button>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>
<script>
import NotificationTemplate from "./Notifications/NotificationTemplate";
import { BaseAlertCustom } from "@/components";
const tableColumns = ["id", "Name", "department", "time", "status"];

export default {
  components: {
    BaseAlertCustom
  },
  methods: {},
  // 印改變的物件
  watch: {
    select_date: function(val) {
      this.getEventByTime(val);
    }
  },
  data() {
    return {
      events: [],
      events_selected: [],
      eventid_count: {
        uid: String,
        name: String,
        department: String,
        count: Number,
        status: "已通知" | "未通知"
      },
      type: ["", "info", "success", "warning", "danger"],
      departments: {},

      select_date: "",
      sortType: "time",
      isReverse: false,
      start_date: Date.now(),
      end_date: Date.now(),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一個月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三個月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    changeType: function(type) {
      var vm = this;
      if (vm.sortType == type) {
        vm.isReverse = !vm.isReverse;
      } else {
        vm.isReverse = false;
      }
      vm.sortType = type;
      
      this.events = this.events.sort((a, b) => {
        let result = 0

        if (vm.sortType == 'time'){
          result = a[vm.sortType].length - b[vm.sortType].length;
        }else{
          result = a[vm.sortType] - b[vm.sortType];
        }

        if (vm.isReverse){
          result = - result;
        }

        return result;
      });

      console.log(this.events);
    },
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
    // 獲得所有 event
    async getEvent() {
      const user_url = `${process.env.VUE_APP_USER_MANAGEMENT_URL}/user`;
      const user_res = (await this.$http.get(user_url)).data.detail;
      const url = `${process.env.VUE_APP_EVENT_MANAGEMENT_URL}/event`;
      const res = (await this.$http.get(url)).data.detail;
      this.updateUser(user_res, res);
    },
    updateUser(user_res, res) {

      for (let i = 0; i < user_res.length; i++) {
        const tmp = res.filter(e => e.uid == user_res[i].uid);
        this.events.push({
          uid: user_res[i].uid,
          name: user_res[i].name,
          email: user_res[i].email,
          count: tmp.length,
          time: tmp.map(e => e.time),
          did: user_res[i].departments
        });
      }

      console.log(this.events);

      this.events = this.events.filter(e => e.time != 0);
    },
    async getEventByTime(val) {
      this.events = [];
      const user_url = `${process.env.VUE_APP_USER_MANAGEMENT_URL}/user`;
      const user_res = (await this.$http.get(user_url)).data.detail;
      const url = `${process.env.VUE_APP_EVENT_MANAGEMENT_URL}/event/time`
      this.AxiosParams = {
        params: {
          start: val[0],
          end: val[1]
        }
      };

      const res = (await this.$http.get(url, this.AxiosParams)).data.detail;
      this.updateUser(user_res, res)
    },
    // 根據時間 filter data
  },
  created() {
    this.getEvent();
  }
};
</script>
<style>
.table {
  width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  color: #e3e3e3;
}

.el-range-editor .el-range-input {
  line-height: 1;
  background-color: #212529;
  color: aliceblue;
}
.table th.click {
  cursor: pointer;
}

.table th.click {
  cursor: pointer;
}

.icon {
  display: inline-block;
}
.icon.inverse {
  transform: rotate(180deg);
}
</style>
