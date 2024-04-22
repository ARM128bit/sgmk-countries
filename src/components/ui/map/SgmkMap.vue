<script setup lang="ts">
import { onMounted, ref, shallowRef, type ShallowRef, watch } from "vue";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, get as getProjection } from "ol/proj.js";
import type { Coordinates } from "@stores/country";

interface DefaultProps {
  coordinates: Coordinates;
}

const props = defineProps<DefaultProps>();

const refMap = ref<HTMLDivElement | null>(null);
const map: ShallowRef<Map | null> = shallowRef(null);

onMounted(() => {
  const projection = getProjection("EPSG:3857");
  if (refMap.value && projection) {
    map.value = new Map({
      target: refMap.value,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(props.coordinates),
        zoom: 6,
        projection,
      }),
    });
  }
});

watch(props.coordinates, (val) => {
  const projection = getProjection("EPSG:3857");
  if (refMap.value && projection) {
    const newView = new View({
      center: fromLonLat(val),
      projection: projection,
    });
    map.value?.setView(newView);
  }
});
</script>
<template>
  <div ref="refMap" class="map"></div>
</template>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;
}
</style>
