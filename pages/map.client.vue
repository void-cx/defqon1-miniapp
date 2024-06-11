<template>
  <div style="position: fixed; top: 10vh; left: 0; height:90vh; width:100vw">
    {{ location }} ({{ updaterRunning }})
    <LMap
      id="map"
      ref="map"
      :zoom="zoom"
      :min-zoom="15"
      :center="[52.43561411832926, 5.752544403076173]"
      :use-global-leaflet="true"
      @ready="mapInitialized"
      @update:zoom="console.log"
    >
      <!-- Base Layer -->
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LTileLayer
        url="https://cdn.msit.systems/defqon/tiles/{z}/tile_{x}_{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.id-t.com/&quot;>ID&T</a> and <a href=&quot;https://www.q-dance.com/en/&quot;>Q-dance</a>"
        layer-type="base"
        :opacity="0.5"
        :max-bounds="[[52.73221134288694, 4.939727783203125],[52.335739487098614, 6.047286987304688]]"
      />
      <template>
        <!-- Campsite 6 -->
        <LPolyline
          :lat-lngs="[
            [52.428436511356374, 5.752512216567994],
            [52.426845859635804, 5.749282836914063],
            [52.42835141621552, 5.747512578964233],
            [52.42984383024529, 5.75085997581482],
            [52.42844960290192, 5.7525014877319345]
          ]"
          :fill="true"
          :fill-opacity="0.5"
          fill-color="#b741b6"
          color="#b741b6"
        >
          <LTooltip>Campsite Six</LTooltip>
        </LPolyline>
      </template>
      <template>
        <!-- Campsite 5 -->
        <LPolyline
          :lat-lngs="[
            [52.429975333598584, 5.7511067390441895],
            [52.431462893253055, 5.75461506843567],
            [52.43016689998534, 5.756267309188844],
            [52.42860249371329, 5.752844810485841],
            [52.429975333598584, 5.7511067390441895],
          ]"
          :fill="true"
          :fill-opacity="0.5"
          fill-color="#b741b6"
          color="#b741b6"
        >
          <LTooltip>Campsite Five</LTooltip>
        </LPolyline>
      </template>
      <template>
        <!-- Campsite 4 (Buscamp) -->
        <LPolyline
          :lat-lngs="[
            [52.433017107329995, 5.750935077667236],
            [52.434368792615004, 5.754083991050721],
            [52.43301070644342, 5.7558971643447885],
            [52.43155767152386, 5.752506852149963],
            [52.433017107329995, 5.750935077667236],
          ]"
          :fill="true"
          :fill-opacity="0.5"
          fill-color="#b77d41"
          color="#b77d41"
        >
          <LTooltip>Campsite Four [Bus Camp]</LTooltip>
        </LPolyline>
        <!-- Bus Checkin -->
        <LMarker
          :lat-lng="[52.43420949225241, 5.754067897796632]"
          name="Bus Check-In"
          
        >
          <LIcon :icon-url="checkinIcon" :icon-size="[32,32]"/>
          <LPopup>Bus Check-In</LPopup>
        </LMarker>
      </template>
      <template>
        <!-- Campsite 3 -->
        <LPolyline
          :lat-lngs="[
            [52.4346348578529, 5.7490575313568115],
            [52.43609433595616, 5.7525014877319345],
            [52.434713396021735, 5.754067897796632],
            [52.43324078206385, 5.750688314437867],
            [52.4346348578529, 5.7490575313568115],
          ]"
          :fill="true"
          :fill-opacity="0.5"
          fill-color="#417bb7"
          color="#417bb7"
        >
          <LTooltip>Campsite Three</LTooltip>
        </LPolyline>
      </template>
      <template>
        <!-- Campsite Two -->
        <LPolyline
          :lat-lngs="[
            [52.43605604866256, 5.747201442718507],
            [52.437469668695684, 5.750505924224854],
            [52.4370573675372, 5.751020908355713],
            [52.43715553482963, 5.751310586929322],
            [52.43693956649763, 5.75162172317505],
            [52.43627856593437, 5.7522761821746835],
            [52.43481254910642, 5.748853683471681],
            [52.43605604866256, 5.747201442718507],
          ]"
          :fill="true"
          :fill-opacity="0.5"
          fill-color="#417bb7"
          color="#417bb7"
        >
          <LTooltip>Campsite Two</LTooltip>
        </LPolyline>
      </template>
      <template>
        <!-- Campsite One -->
        <LPolyline
          :lat-lngs="[
[52.437705156117076, 5.74462652206421],
[52.43629154363856, 5.746268033981323],
[52.436533693439266, 5.7467079162597665],
[52.436396257229184, 5.74686884880066],
[52.437535001460304, 5.7495832443237305],
[52.43779677758319, 5.749325752258302],
[52.438006197361815, 5.749808549880982],
[52.43930850426955, 5.748349428176881],
[52.437705156117076, 5.74462652206421],
          ]"
          :fill="true"
          :fill-opacity="0.5"
          fill-color="#4141b7"
          color="#4141b7"
        >
          <LTooltip>Campsite One [Friends Camp]</LTooltip>
        </LPolyline>
      </template>
      <template>
        <!-- Sanctuary & Highlands -->
        <LPolyline
          :lat-lngs="[
[52.43854473814554, 5.743832588195802],
[52.44103149153618, 5.741257667541505],
[52.44207662352885, 5.744320750236512],
[52.439845331597496, 5.746842026710511],
[52.43854473814554, 5.743832588195802],
          ]"
          :fill="true"
          :fill-opacity="0.5"
          fill-color="#b74141"
          color="#b74141"
        >
          <LTooltip>The Sanctuary</LTooltip>
        </LPolyline>
      </template>
      <LMarker
        :lat-lng="location"
        name="Location"
      />
      <LControl position="topleft" class="leaflet-control-zoom leaflet-bar leaflet-control">
        <a
          role="button"
          class="leaflet-control-zoom-in pt-1 pr-1"
          @click="goToGPS"
        >
          <i class="fal fa-location-arrow"></i>
        </a>
      </LControl>
      <LControl position="topleft" class="leaflet-control-zoom leaflet-bar leaflet-control">
        <a
          role="button"
          class="leaflet-control-zoom-in pt-1 pr-1"
          @click="goToFestival"
        >
          <i class="fal fa-party-horn"></i>
        </a>
      </LControl>
    </LMap>
  </div>
</template>

<script setup>
const zoom = ref(15);
const map = ref(null);
const location = ref([0.0, 0.0]);
const updaterRunning = ref(false);

const checkinIcon = '/images/check-in-desk.png';

const mapInitialized = () => {
  const L = map.value.leafletObject

  L.on('click', e => {
    startLocationUpdater()
  });
}

const startLocationUpdater = () => {
  if (!navigator.geolocation) return
  if (updaterRunning.value) return
  updaterRunning.value = true
  setInterval(() => {
    navigator.geolocation.getCurrentPosition(updateLocation);
  }, 1000)
}

const goToGPS = () => {
  const L = map.value.leafletObject
  L.panTo(location.value);
}

const goToFestival = () => {
  const L = map.value.leafletObject
  L.panTo([52.43561411832926, 5.752544403076173]);
}

const updateLocation = (position) => {
  location.value = [position.coords.latitude, position.coords.longitude];
}


</script>

<style>
#map {
  margin: 0;
}
</style>