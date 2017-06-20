<template>
    <div>
        <el-row justify="center" type="flex">
            <el-col :span="14">
                <gmap-map :center=center :zoom="9" map-type-id="terrain" :resize-bus="customBus" @click="mapClicked" @dblclick="" style="width: 100%; height: 80vh;">
                    <gmap-marker :key="m.id" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="(index == editingMarker) && editMode" @click="markerClicked(m)">
                        <gmap-info-window :opened="(index == editingMarker) && (m.ifw2text != '')" :content="generateInfo(index)"></gmap-info-window>
                    </gmap-marker>
                </gmap-map>
            </el-col>
            <el-col :span="4">
                <el-switch v-model="editMode" on-text="Просмотр" off-text="Правка" width="100" @click="editMode = !editMode"></el-switch>
                <el-form ref="form" v-if="showForm">
                    <el-form-item label="Название метки: ">
                        <el-input v-model.trim="markers[editingMarker].title" :disabled="!editMode"></el-input>
                    </el-form-item>
                    <el-form-item label="Описание метки: ">
                        <el-input v-model.trim.lazy="markers[editingMarker].desc" :disabled="!editMode"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import * as VueGoogleMaps from 'vue2-google-maps'
  import Vue from 'vue'

  export default {
    name: 'hello',
    data () {
      return {
        editMode: false,
        center: { lat: 56.13222, lng: 47.25194 },
        markers: [],
        editingMarker: -1,
        lastId: 0,
        showForm: false,
        customBus: new Vue()
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
          title: '',
          desc: ''
        })
        return this.markers[this.markers.length - 1]
      },
      showEditForm: function (id) {
        this.showForm = true
        this.editingMarker = this.markers.findIndex(function (elem) {
          return elem.id === id
        })
      },
      generateInfo: function (index) {
        if (!this.editMode) {
          return '<b>' + this.markers[index].title + '</b><br>' + this.markers[index].desc
        } else {
          return '<b>' + this.markers[index].title + '</b>'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .el-col {
        padding: 10px;
    }
</style>
