<template>
    <span>
      <ns-form-item label="发送小区所在省" prop="provinceId">
        <ns-select
          v-model="model.provinceId"
          :options="provinces"
          @change="provinceChange"
          placeholder="请选择省"></ns-select>
      </ns-form-item>

      <ns-form-item label="发送小区所在市" prop="cityId">
        <ns-select v-model="model.cityId"
                   :disabled="!model.provinceId"
                   :options="cities"
                   @change="cityChange"
                   placeholder="请选择市"
                  ></ns-select>
      </ns-form-item>

      <ns-form-item label="发送小区"  prop="precinctIds">
        <ns-select
          multiple
          collapseTags
          placeholder="请选择发送小区"
          v-model="model.precinctIds"
          :disabled="!model.provinceId || !model.cityId"
          :options="precincts"></ns-select>
      </ns-form-item>
    </span>
</template>

<script>
  import { getAreaList, getPrecinct } from '../../../service/Form/getOptions'
  export default {
    name: 'ns-biz-precinct',

    props: {
      precinctModel: Object,
    },

    data(){
      return {
        provinces: [],

        cities: [],

        precincts: [],

        model: this.precinctModel
      }
    },

    methods: {
      initAreaLink(){
        this.$nextTick(()=>{
          //获取城市
          this.model = this.precinctModel;
          if(this.model.provinceId){
            this.getAreaList({parentID: this.model.provinceId, type: '2'});
          }
          if(this.model.cityId){
            this.getPrecinct()
          }
        })
      },

      getAreaList(query){
        getAreaList(query).then((data)=>{
          if(query.parentID === '0001'){
            this.provinces = data.resultData;
          }else{
            this.cities = data.resultData;
          }
        })
      },

      /**
       * 省change
       * @param val
       */
      provinceChange(val){
        this.cities = [];
        this.precincts = [];
        this.model.cityId = '';
        this.model.precinctIds = [];
        if(val){
          this.getAreaList({parentID: val, type: '2'})
        }
      },

      /**
       * 市change
       * @param val
       */
      cityChange(val){
        this.precincts = [];
        this.model.precinctIds = [];
        if(val){
          this.getPrecinct()
        }
      },

      getPrecinct(){
        getPrecinct({
          provinceId: this.model.provinceId,
          cityId: this.model.cityId
        }).then((res)=> {
          this.precincts = res.resultData;
        })
      }

    },

    created(){
      this.getAreaList({parentID: '0001', type: '1'});
    }
  };
</script>

<style scoped>

</style>
