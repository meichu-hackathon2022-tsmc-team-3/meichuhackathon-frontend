<template>
  <div id="app">
    <card type="plain" title="讓主管標示危險區域"> </card>
    <div class="map" id="map"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      icon: {
        type: {
          black:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
          gold:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png"
        },
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }
    };
  },
  created() {
    this.$nextTick(() => {
      // 獲得目前位置
      navigator.geolocation.getCurrentPosition(position => {
        const p = position.coords;
        // 將中心點設為目前的位置
        this.center = [p.latitude, p.longitude];
        console.log(p);
      });
    });
  },
  mounted() {
    this.$nextTick(() => {
      // 獲得目前位置
      navigator.geolocation.getCurrentPosition(position => {
        const p = position.coords;
        // 將中心點設為目前的位置
        this.center = [p.latitude, p.longitude];
        console.log(p);
      });
      // return p;
    });
    this.map = L.map("map", {
      // get current position

      center: [24.788992, 121.0023936], // center
      zoom: 16, // 縮放
      zoomControl: false,
      doubleClickZoom: false,
      attributionControl: false
    });
    let gaoDeLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );
    gaoDeLayer.addTo(this.map);
    this.map.on("click", e => {
      L.popup()
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(this.map);
    });
    this.map.on("dblclick", e => {
      L.popup()
        .setLatLng(e.latlng)
        .setContent("You double clicked the map at " + e.latlng.toString())
        .openOn(this.map);
    });
    this.map.on("contextmenu", e => {
      L.popup()
        .setLatLng(e.latlng)
        .setContent("You right clicked the map at " + e.latlng.toString())
        .openOn(this.map);
    });
    this.map.pm.addControls({
      position: "topleft",
      drawPolygon: true,
      drawMarker: true,
      drawCircleMarker: true,
      drawPolyline: true,
      drawRectangle: true,
      drawCircle: true,
      drawText: true,
      editMode: true,
      dragMode: true,
      cutPolygon: true,
      removalMode: true
    });
    this.map.on("pm:drawstart", e => {
      console.log(e, "start");
    });
    this.map.on("pm:drawend", e => {
      console.log(e, "end");
    });
    this.map.on("pm:create", e => {
      console.log(e, "finish");
      if (e.shape == "Circle") {
        console.log(e.layer._latlng, e.layer._radius, "座標");
      } else {
        console.log(e.layer._latlngs[0], "座標");
      }
    });
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
</style>
