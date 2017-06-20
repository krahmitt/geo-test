<template>
  <div class="hello">
    <button @click="editMode = !editMode" v-if="!editMode">Редактировать</button>
    <button @click="editMode = !editMode" v-else>Выйти из редактирования</button>
    <gmap-map
            :center=center
            :zoom="9"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
            @click="mapClicked"
    >
      <gmap-marker :key="m.id" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="(index == editingMarker) && editMode" @click="markerClicked(m)">
          <gmap-info-window :opened="(index == editingMarker) && (m.ifw2text != '')" :content="m.ifw2text"></gmap-info-window>
        </gmap-marker>
    </gmap-map>
    <div id="editForm" v-if="showForm">
        <form action="" :data-id="editingMarker">
            <span>ID: {{ markers[editingMarker].id }}</span>
            <label for="title">Название: </label>
            <input name="ifw2text" id="title" type="text" v-model.trim="markers[editingMarker].ifw2text" :disabled="!editMode">
            <label for="desc">Описание: </label>
            <input name="ifw2text" id="desc" type="text" v-model.trim.lazy="markers[editingMarker].desc" :disabled="!editMode">
        </form>
    </div>
  </div>
</template>

<script>
  import * as VueGoogleMaps from 'vue2-google-maps'
  import Vue from 'vue'

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyBbwAXuthv8rUd5LlWf2H6_r7hrxij_Pr8',
      v: '3.29'
      // libraries: 'places', //// If you need to use place input
    }
  })

  export default {
    name: 'hello',
    data () {
      return {
        editMode: false,
        center: { lat: 56.13222, lng: 47.25194 },
        markers: [],
        editingMarker: -1,
        lastId: 0,
        showForm: false
      }
    },
    components: {
      'gmap-map': VueGoogleMaps.Map,
      'gmap-marker': VueGoogleMaps.Marker,
      'gmap-info-window': VueGoogleMaps.InfoWindow
    },
    methods: {
      mapClicked (mouseArgs) {
        let marker
        if (this.editMode) {
          marker = this.addMarker(
            mouseArgs.latLng.lat(),
            mouseArgs.latLng.lng(),
            false
          )
          this.showEditForm(marker.id)
        }
      },
      markerClicked (marker) {
        this.showEditForm(marker.id)
      },
      addMarker: function addMarker (lat, lng, draggable) {
        this.lastId++
        this.markers.push({
          id: this.lastId,
          position: {
            lat,
            lng
          },
          opacity: 1,
          draggable,
          enabled: true,
          ifw: true,
          ifw2text: '',
          desc: ''
        })
        return this.markers[this.markers.length - 1]
      },
      showEditForm: function (id) {
        this.showForm = true
        this.editingMarker = this.markers.findIndex(function (elem) {
          return elem.id === id
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
