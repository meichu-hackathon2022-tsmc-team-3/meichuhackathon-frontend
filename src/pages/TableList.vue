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
    <div class="col-12 mt-5">
      <!-- 可以排序的 -->
      <table class="table">
        <thead>
          <tr>
            <th class="click" @click="changeType('id')">
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
          <tr v-for="item in sortData" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.department }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.status }}</td>
            <td>
              <base-button type="info" size="sm" icon>
                <i class="tim-icons icon-chat-33"></i>
              </base-button>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>
<script>
import { Select } from "element-ui";
const tableColumns = ["id", "Name", "department", "time", "status"];
const tableData = [
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
  methods: {},
  // 印改變的物件
  watch: {
    select_date: function(val) {
      console.log({ val });
    }
  },
  data() {
    return {
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
  // 請在此撰寫 JavaScript
  methods: {
    changeType: function(type) {
      var vm = this;
      if (vm.sortType == type) {
        vm.isReverse = !vm.isReverse;
      } else {
        vm.isReverse = false;
      }
      vm.sortType = type;
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
