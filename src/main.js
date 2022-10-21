/*
 =========================================================
 * Vue Black Dashboard - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import App from "./App";
// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/index";

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
import './registerServiceWorker'
import { DatePicker, Table } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import * as L from "leaflet";
import "leaflet.pm";
import "leaflet.pm/dist/leaflet.pm.css";

Vue.config.productionTip = false;
Vue.L = Vue.prototype.$L = L;

// 載入 vue2-leaflet，依照自己需要載入組件
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";
// 載入 css
import "leaflet/dist/leaflet.css";
// 啟用載入的各組件
Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-popup", LPopup);
Vue.component("l-icon", LIcon);
// 設定預設 icon
import { Icon } from "leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

Vue.prototype.$http = axios;
Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(DatePicker, Table);

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
