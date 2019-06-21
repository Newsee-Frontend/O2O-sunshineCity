<template>
    <span>
      <ns-form-item label="发送范围省" prop="provinceId">
        <ns-select
          v-model="model.provinceId"
          :options="provinces"
          @change="provinceChange"
          placeholder="请选择省"></ns-select>
      </ns-form-item>

      <ns-form-item label="发送范围市" prop="cityId">
        <ns-select v-model="model.cityId"
                   :disabled="!model.provinceId"
                   :options="cities"
                   @change="cityChange"
                   placeholder="请选择市"
                  ></ns-select>
      </ns-form-item>

      <ns-form-item label="发送范围"  prop="precinctIds">
        <ns-select
          multiple
          collapseTags
          placeholder="请选择范围"
          v-model="model.precinctIds"
          :disabled="!model.provinceId || !model.cityId"
          :options="precincts"></ns-select>
      </ns-form-item>
    </span>
</template>

<script>
  import { getAreaList, getPrecinct } from '../../../service/Form/getOptions'
  export default {
    name: 'biz-precinct',

    props: {
      precinctModel: Object,
    },

    watch: {
      precinctModel(obj){
        this.model = obj;
      }
    },

    data(){
      return {
        provinces: [],

        cities: [],

        precincts: [],

        model: {
          provinceId: '',
          cityId: '',
          precinctIds: []
        }
      }
    },

    methods: {
      initAreaLink(){
        this.getAreaList({parentId: '1', type: 'province'});
        this.model = this.precinctModel;
        //获取城市
        if(this.model.provinceId){
          this.getAreaList({parentId: this.model.provinceId, type: 'city'});
        }
        if(this.model.cityId){
          this.getPrecinct()
        }
      },

      getAreaList(query){
        getAreaList(query).then((data)=>{
          if(query.parentId === '1'){
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
        this.model.precinctIdList = [];
        if(val){
          this.getAreaList({parentId: val, type: 'city'})
        }
      },

      /**
       * 市change
       * @param val
       */
      cityChange(val){
        this.precincts = [];
        this.model.precinctIdList = [];
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
      this.initAreaLink()
    }
  };
</script>

<style scoped>

</style>
