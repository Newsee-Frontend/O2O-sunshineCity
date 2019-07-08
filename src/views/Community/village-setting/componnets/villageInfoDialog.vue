<template>
  <ns-slip-dialog
    :visible.sync="showDialog"
    left="50px"
    right="0px"
    top="50px"
    bottom="0px"
    :appendToBody="false"
    animation="fade-normal"
    :beforeClose="close"
    ref="slipDialog">
    <div class="slip-title">{{type === 'add'? '新增小区': '编辑小区'}}</div>

    <div class="slip-btns">
      <biz-role-button-area :buttonList="roleButtonForm" @command="roleButtonCommand"></biz-role-button-area>
    </div>


    <div class="silp-container">
      <ns-form ref="villageForm" :model="villageModel"  :rules="villageRules" label-width="120px">
        <ns-form-item label="所属组织" prop="organizationId">
          <!--simple tree in select （ 请选择所属部门树状数据 /  ） -->
          <ns-checkbox-tree-select
            v-model="villageModel.organizationId"
            bizType="role-organization"
            placeholder="请选择组织"
            :multiple="false"
            clearable
            width="400px"
          >
          </ns-checkbox-tree-select>
        </ns-form-item>
        <ns-form-item label="小区名称"   prop="precinctName">
          <ns-input size="medium" v-model.trim="villageModel.precinctName" placeholder="请填写小区名称"></ns-input>
        </ns-form-item>
        <ns-form-item label="小区简称"  prop="precinctShortName">
          <ns-input size="medium" v-model.trim="villageModel.precinctShortName" placeholder="请填写小区简称"></ns-input>
        </ns-form-item>
        <ns-row style="display: flex;">
          <ns-form-item label="所属城市" prop="provinceId" >
            <ns-select
              width="120px"
              placeholder="请选择省"
              :options="provinceList"
              @change="provinceChange"
              v-model="villageModel.provinceId"
            ></ns-select>
          </ns-form-item>
          <ns-form-item prop="cityId" label-width="20px">
            <ns-select
              width="120px"
              placeholder="请选择市"
              :options="cityList"
              @change="cityChange"
              :disabled="!villageModel.provinceId"
              v-model="villageModel.cityId"></ns-select>
          </ns-form-item>
          <ns-form-item prop="areaId" label-width="20px">
            <ns-select
              width="120px"
              placeholder="请选择区县"
              :options="areaList"
              :disabled="!villageModel.cityId || !villageModel.provinceId"
              v-model="villageModel.areaId"></ns-select>
          </ns-form-item>
        </ns-row>
        <ns-form-item label="详细地址" prop="address">
          <ns-input
            size="medium"
            v-model.trim="villageModel.address"
            placeholder="请填写详细地址"
            @input="addressChange"
          ></ns-input>
        </ns-form-item>
        <!--地图-->
        <ns-form-item prop="lngLat">
          <div ref="allmap" style="width: 480px; height: 300px;margin-left:-80px;"> </div>
        </ns-form-item>

        <ns-form-item label="状态">
          <ns-select
            size="medium"
            :options="authStatusOptions"
            v-model="villageModel.status"
          >
          </ns-select>
        </ns-form-item>
        <ns-form-item label="联系人" prop="contact">
          <ns-input size="medium" v-model.trim="villageModel.contact" placeholder="请填写联系人"></ns-input>
        </ns-form-item>
        <ns-form-item label="联系电话" prop="contactPhone">
          <ns-input size="medium" v-model.trim="villageModel.contactPhone" placeholder="请填写联系电话"></ns-input>
        </ns-form-item>
        <ns-form-item label="园区服务电话" prop="serviceCall">
          <ns-input size="medium" v-model.trim="villageModel.serviceCall" placeholder="请填写服务电话,多个号码用/隔开"></ns-input>
        </ns-form-item>
      </ns-form>
    </div>
  </ns-slip-dialog>
</template>

<script>
  import { getAreaList} from '../../../../service/Form/getOptions'
  import { getPrecinctInfo, savePrecinctInfo } from '../../../../service/Community/villageSetting'
  import {mapGetters} from 'vuex';

  export default {
    name: 'villageDialog',

    props: {
      rowData: Object,
      visible: {
        type: Boolean,
        default: false
      },
      type: String,
      companyList: {
        type: Array
      }
    },

    data(){
      return{
        authStatusOptions: [{ label: '待开通', value: 0 }, { label: '开通中', value: 1 }, { label: '已关闭', value: 2 }],
        showDialog: false,
        villageModel: {
          id: "",
          organizationId: "",
          precinctName: "",
          precinctShortName: "",
          provinceId: "",
          cityId: "",
          areaId: "",
          address: "",
          status: 0,
          lngLat: "",
          contact: "",
          serviceCall: ""
        },
        villageRules: {
          organizationId: [{ required: true, trigger: 'blur',message: '请选择所属组织'}],
          precinctName: [{ required: true, trigger: 'change',message: '请填写小区名称'}],
          precinctShortName: [{ required: true, trigger: 'change',message: '请填写小区简称'}],
          provinceId: [{ required: true, trigger: 'change',message: '请选择省'}],
          cityId: [{ required: true, trigger: 'change',message: '请选择市'}],
          areaId: [{ required: true, trigger: 'change',message: '请选择区/县'}],
          address:[{ required: true, trigger: 'change',message: '请填写详细地址'}],
          contact: [{ required: true, trigger: 'change',message: '请填写联系人'}],
          contactPhone: [{ required: true, trigger: 'change',message: '请填写联系电话'}],
          serviceCall: [{ required: true, trigger: 'change',message: '请填写服务电话'}]
        },
        provinceList: [],
        cityList: [],
        areaList: []
      }
    },

    watch: {
      visible(val){
        this.showDialog = val;
        if(val){
          this.initForm()
        }
      }
    },

    computed: {
      ...mapGetters(['roleButtonForm']),
    },

    methods: {
      /**
       * @init 初始化
       */
      initForm(){
        if(this.type === 'edit'){
          //get 初始化数据
          this.villageModel.organizationId = this.rowData.organizationId;
          getPrecinctInfo({precinctId: this.rowData.id}).then((data)=>{
            this.villageModel = data.resultData.PrecinctVo;
            this.villageModel.id = this.rowData.id;
            this.getCity();
            this.getArea();
            this.$nextTick(()=>{
              this.initMap(...this.villageModel.lngLat.split(','));
            });
          })
        }else{
          this.$nextTick(()=>{
            this.initMap();
            this.villageModel.id = '';
          });
        }
      },

      MP(){
        window.onload = function () {
          window.BMap = BMap;
        };
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://api.map.baidu.com/api?v=2.0&ak=0F1TvmOG0zmcow1b6V1jwjHp&callback=init";
        document.head.appendChild(script);
      },
      /**
       * 初始化map
       */
      initMap(lng, lat){
        var map = new BMap.Map(this.$refs.allmap);
        var point = new BMap.Point(116.331398,39.897445);
        map.centerAndZoom(point, 12);
        map.enableScrollWheelZoom(true);
        //设置初始化地图，设置IP所在的城市
        if(lng, lat){
          let point = new BMap.Point(lng, lat);
          map.addOverlay(new BMap.Marker(point));
          map.centerAndZoom(point,16);
        }else{
          let myCity = new BMap.LocalCity();
          myCity.get((result)=>{
            map.setCenter(result.name);
          });
        }
      },

        /**
         * 地址的变化，联动地图解析
         */
      addressChange(val){
        let province = this.translateAreaByCode(this.provinceList, this.villageModel.provinceId);
        let city = this.translateAreaByCode(this.cityList, this.villageModel.cityId);
        let area = this.translateAreaByCode(this.areaList, this.villageModel.areaId);
        let pointVal = province + city + area + val;
        if(!val) return
        let map = new BMap.Map(this.$refs.allmap);
        map.enableScrollWheelZoom(true);
        let myGeo = new BMap.Geocoder();
          // 将地址解析结果显示在地图上,并调整地图视野
          myGeo.getPoint(pointVal, (point) =>{
            if (point) {
              map.centerAndZoom(point, 16);
              map.addOverlay(new BMap.Marker(point));
              this.villageModel.lngLat = point.lng + ',' + point.lat;
            } else {
              this.$message.error('您选择地址没有解析到结果')
            }
          },);
      },

      /**
       * 转换， 省市区 code转换成 name
       * @param list 省市区数组， code 省市区代码
       */

      translateAreaByCode(list, code){
        let name = '';
        if(code){
          let item = list.find( item => (item.value === code))
          item && (name = item.label)
        }
        return name;
      },



      /**
       * 省改变
       */
      provinceChange(val){
          this.cityList = [];
          this.areaList = [];
          this.villageModel.cityId = '';
          this.villageModel.areaId = '';
          if(val){
            this.getCity()
          }
      },

      /**
       * 市改变
       */
      cityChange(val){
        this.areaList = [];
        this.villageModel.areaId = '';
        if(val){
          this.getArea();
        }
      },


      roleButtonCommand(item){
        switch (item.code) {
          case 'formSaveBtn':
            this.submit(item);
            break;

          case 'formReturnBtn':
            this.showDialog = false;
            break
        }
      },

      /**
       *  表单提交
       */
      submit(btnInfo){
        this.$refs.villageForm.validate((valid)=>{
          if(valid){
           this.$set(btnInfo, 'disabled', true);
            savePrecinctInfo(this.villageModel).then((data)=>{
              this.showDialog = false;
              this.$message.success('保存成功');
              this.$emit('reloadGrid')
              this.$set(btnInfo, 'disabled', false);

            }, ()=>{
              this.$set(btnInfo, 'disabled', false);
            })
          }
        })
      },


      /**
       * 更新visible
       */
      close(){
        this.$refs.villageForm.resetFields();
        this.showDialog = false;
        this.$emit('update:visible', this.showDialog);
      },

      /**
       * 获取省
       */
      getProvince(){
        getAreaList({parentID: '0001', type: '1'}).then((data)=>{
          this.provinceList = data.resultData || [];
        });
      },

      /**
       * 获取市
       */
      getCity(){
        getAreaList({parentID: this.villageModel.provinceId, type: '2'}).then((data)=>{
          this.cityList = data.resultData || [];
        });
      },

      /**
       * 获取区
       */
      getArea(){
        getAreaList({parentID: this.villageModel.cityId, type: '3'}).then((data)=>{
          this.areaList = data.resultData || [];
        });
      },
    },

    mounted(){
     this.getProvince();
      if(window.BMap) return;
      this.MP();
    }
  };
</script>

<style>
  .slip-title {
    font-size: 16px;
    font-weight: bold;
    padding: 14px 0;
  }

  .silp-container {
    margin: 20px auto;
    width: 1000px;
  }

</style>
