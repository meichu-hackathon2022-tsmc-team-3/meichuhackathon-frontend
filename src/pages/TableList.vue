<template>
  <div class="row">
    <h3>違規次數排行榜</h3>
    <h3>{{ select_date }}</h3>
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
    <h2>{{ start_date[0] }}</h2>
    <h2>{{ start_date[1] }}</h2>
    <!-- <h3>{{ events }}</h3> -->
    <div class="col-12 mt-5">
      <!-- 可以排序的 -->
      <table class="table">
        <thead>
          <tr>
            <th class="click" @click="changeType('uid')">
              company id
              <span
                class="icon"
                :class="{ inverse: isReverse }"
                v-if="sortType == 'id'"
              >
                <i class=" fas fa-angle-up text-success"></i>
              </span>
            </th>
            <th>name</th>
            <th>department</th>
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
            <th>status</th>
            <th>alert</th>
          </tr>
          <tr v-for="item in events" :key="item.uid">
            <td>{{ item.uid }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.count }}</td>
            <td>{{ item.status }}</td>
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

let tableData = [
  {
    id: 1,
    name: "沒戴安全帽人1",
    time: 5,
    pic: "https://fakeimg.pl/250/",
    status: "已通知",
    department: "部門1"
  },
  {
    id: 2,
    name: "沒戴安全帽人2",
    time: 3,
    pic: "https://fakeimg.pl/250/",
    status: "未通知",
    department: "部門2"
  },
  {
    id: 3,
    name: "沒戴安全帽人3",
    time: 2,
    pic: "https://fakeimg.pl/250/",
    status: "已通知",
    department: "部門3"
  },
  {
    id: 4,
    name: "沒戴安全帽人4",
    time: 1,
    pic: "https://fakeimg.pl/250/",
    status: "未通知",
    department: "部門1"
  },
  {
    id: 5,
    name: "沒戴安全帽人4",
    time: 1,
    pic: "https://fakeimg.pl/250/",
    status: "未通知",
    department: "部門1"
  },
  {
    id: 6,
    name: "沒戴安全帽人4",
    time: 8,
    pic: "https://fakeimg.pl/250/",
    status: "未通知",
    department: "部門1"
  },
  {
    id: 7,
    name: "沒戴安全帽人4",
    time: 10,
    pic: "https://fakeimg.pl/250/",
    status: "未通知",
    department: "部門1"
  }
];

export default {
  components: {
    BaseAlertCustom
  },
  methods: {},
  // 印改變的物件
  watch: {
    select_date: function(val) {
      console.log({ val });
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

      select_date: "",
      sortType: "time",
      isReverse: false,
      start_date: Date.now(),
      end_date: Date.now(),
      table2: {
        title: "Table on Plain Background",
        columns: [...tableColumns],
        data: [...tableData]
      },
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
      const user_url = "http://localhost:5000/api/v1/user";
      let user_res = (await this.$http.get(user_url)).data.detail;
      const url = "http://localhost:5100/api/v1/event";
      let res = (await this.$http.get(url)).data.detail;

      for (let i = 0; i < user_res.length; i++) {
        const tmp = res.filter(e => e.uid == user_res[i].uid);
        this.events.push({
          uid: user_res[i].uid,
          name: user_res[i].name,
          email: user_res[i].email,
          count: tmp.length,
          time: tmp.map(e => e.time),
          status: "未通知"
        });
      }
      console.log("---event---");
      console.log(this.events);
    },
    async getEventByTime(val) {
      console.log(val[0], val[1]);
      const user_url = "http://localhost:5000/api/v1/user";
      let user_res = (await this.$http.get(user_url)).data.detail;
      const url = "http://localhost:5100/api/v1/event/time";
      this.AxiosParams = {
        params: {
          start: val[0],
          end: val[1]
        }
      };

      let res = (await this.$http.get(url, this.AxiosParams)).data.detail;
      console.log(user_res, res);
      for (let i = 0; i < user_res.length; i++) {
        const tmp = res.filter(e => e.uid == user_res[i].uid);
        this.events_selected.push({
          uid: user_res[i].uid,
          name: user_res[i].name,
          email: user_res[i].email,
          count: tmp.length,
          time: tmp.map(e => e.time),
          status: "未通知"
        });
      }
      console.log("---event by time---");
      console.log(this.events_selected);
    },
    // 根據時間 filter data
    async filterData(val) {
      console.log("---filterDat.event---");
      console.log(this.events);
      console.log(val);
      this.start_date = val[0];
      this.end_date = val[1];
      console.log("----tmp-----");
      console.log(this.start_date, this.end_date);
      this.events = this.events.filter(e => e.time.length > 0);
      console.log("過濾 undefined");
      console.log(this.events);

      // 根據 time 的時間 filter data
      // for (let i = 0; i < this.events.length; i++) {
      //   this.events[i].time = this.events[i].time.filter(e => {
      //     console.log(e);
      //     e > this.start_date && e < this.end_date;
      //   });
      //   this.events[i].count = this.events[i].time.length;
      //   console.log(this.events[i].time);
      //   console.log(this.events[i].count);
      // }
      // let tmp = this.events.filter(e => {
      //   console.log(e);
      //   console.log(e.length);
      //   e.time[0] >= this.start_date && e.time[1] <= this.end_date;
      // });
      // console.log(tmp);
      // this.events = [];
      // for (let i = 0; i < tmp.length; i++) {
      //   const tmp2 = tmp.filter(e => e.uid == tmp[i].uid);
      //   this.events.push({
      //     uid: tmp[i].uid,
      //     name: tmp[i].name,
      //     email: tmp[i].email,
      //     count: tmp2.length,
      //     time: tmp2.map(e => e.time),
      //     status: "未通知"
      //   });
      // }
      console.log("---event------");

      console.log(this.events);
      // console.log(tableData);
      // tableData = this.events;
      // console.log(tableData);
      console.log("---------");
    }
  },
  computed: {
    sortData: function() {
      var vm = this;
      var sortType = vm.sortType;
      var isReverse = vm.isReverse;
      var data = vm.table2.data;
      var result = data.sort(function(a, b) {
        return a[sortType] - b[sortType];
      });
      if (isReverse) {
        result = result.reverse();
      }
      return result;
    }
  },
  created() {
    this.getEvent();
    // console.log(tableData);
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
