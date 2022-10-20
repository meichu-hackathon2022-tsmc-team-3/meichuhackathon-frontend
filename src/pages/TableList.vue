<template>
  <div class="row">
    <!-- <div class="col-12">
      <card :title="table1.title">
        <div class="table-responsive">
          <base-table
            :data="table1.data"
            :columns="table1.columns"
            thead-classes="text-primary"
          >
          </base-table>
        </div>
      </card>
    </div> -->
    <h3>違規次數排行榜</h3>
    <div class="col-12">
      <card class="card-plain">
        <div class="table-full-width table-responsive">
          <base-table
            :title="table2.title"
            :sub-title="table2.subTitle"
            :data="table2.data"
            :columns="table2.columns"
          >
          </base-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
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
    time: 1,
    pic: "https://fakeimg.pl/250/",
    status: "未通知",
    department: "部門1"
  },
  {
    id: 7,
    name: "沒戴安全帽人4",
    time: 1,
    pic: "https://fakeimg.pl/250/",
    status: "未通知",
    department: "部門1"
  }
];

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
        data: [...tableData]
      },
      table2: {
        title: "Table on Plain Background",
        columns: [...tableColumns],
        data: [...tableData]
      }
    };
  }
};
</script>
<style></style>
