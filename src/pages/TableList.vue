<template>
  <div class="row">
    <div class="col-12">
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
    </div>

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
const tableColumns = ["Name", "department", "time", "status"];
const tableData = [
  {
    id: 1,
    name: "Dakota Rice",
    time: 5,
    status: "notified",
    department: "Oud-Turnhout"
  },
  {
    id: 2,
    name: "Minerva Hooper",
    time: 3,
    status: "notified",
    department: "Sinaai-Waas"
  },
  {
    id: 3,
    name: "Sage Rodriguez",
    time: 2,
    status: "notified" ,
    department: "Baileux"
  },
  {
    id: 4,
    name: "Philip Chaney",
    time: 2,
    status: "notified",
    department: "Overland Park"
  },
  {
    id: 5,
    name: "Doris Greene",
    time: 1,
    status: "notified",
    department: "Feldkirchen in Kärnten"
  },
  {
    id: 6,
    name: "Mason Porter",
    time: 3,
    status: "notified",
    department: "Gloucester"
  },
  {
    id: 7,
    name: "Jon Porter",
    time: 5,
    status: "notified",
    department: "Gloucester"
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
