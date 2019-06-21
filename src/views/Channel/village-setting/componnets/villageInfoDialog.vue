<template>
  <ns-dialog
    width="650px"
    :visible.sync="showDialog"
    @close="close"
    title="小区详情"
  >
    <ns-form ref="villageForm" :model="villageModel"  :rules="villageRules" label-width="120px">
      <ns-form-item label="所属公司" prop="companyID">
        <ns-select size="medium" :options="companyList" v-model="villageModel.companyID" placeholder="请选择公司"></ns-select>
      </ns-form-item>
      <ns-form-item label="小区名称"   prop="precinctName">
        <ns-input size="medium" v-model="villageModel.precinctName" placeholder="请填写小区名称"></ns-input>
      </ns-form-item>
      <ns-form-item label="小区简称"  prop="precinctShortName">
        <ns-input size="medium" v-model="villageModel.precinctShortName" placeholder="请填写小区简称"></ns-input>
      </ns-form-item>
      <ns-row style="display: flex;">
        <ns-form-item label="所属城市" prop="provinceID" >
          <ns-select
            width="120px"
            placeholder="请选择省"
            :options="provinceList"
            @change="provinceChange"
            v-model="villageModel.provinceID"
          ></ns-select>
        </ns-form-item>
        <ns-form-item prop="cityID" label-width="20px">
          <ns-select
            width="120px"
            placeholder="请选择市"
            :options="cityList"
            @change="cityChange"
            :disabled="!villageModel.provinceID"
            v-model="villageModel.cityID"></ns-select>
        </ns-form-item>
        <ns-form-item prop="areaID" label-width="20px">
          <ns-select
            width="120px"
            placeholder="请选择区县"
            :options="areaList"
            :disabled="!villageModel.cityID || !villageModel.provinceID"
            v-model="villageModel.areaID"></ns-select>
        </ns-form-item>
      </ns-row>
      <ns-form-item label="详细地址" prop="address">
        <ns-input
          size="medium"
          v-model="villageModel.address"
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
        <ns-input size="medium" v-model="villageModel.contact" placeholder="请填写联系人"></ns-input>
      </ns-form-item>
      <ns-form-item label="联系电话" prop="contactPhone">
        <ns-input size="medium" v-model="villageModel.contactPhone" placeholder="请填写联系电话"></ns-input>
      </ns-form-item>
      <ns-form-item label="园区服务电话" prop="serviceCall">
        <ns-input size="medium" v-model="villageModel.serviceCall" placeholder="请填写服务电话,多个号码用/隔开"></ns-input>
      </ns-form-item>
    </ns-form>
    <span slot="footer" class="dialog-footer">
      <ns-button @click="showDialog = false" size="small">取 消</ns-button>
      <ns-button type="primary" @click="submit" size="small" :loading="submitLoading">确 定</ns-button>
   </span>
  </ns-dialog>
</template>

<script>
  import { getAreaList} from '../../../../service/Form/getOptions'
  import { getPrecinctInfo, savePrecinctInfo } from '../../../../service/Channel/villageSetting'
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
        authStatusOptions: [{ label: '待开通', value: '0' }, { label: '开通中', value: '1' }, { label: '已关闭', value: '2' }],
        showDialog: false,
        submitLoading: false,
        villageModel: {
          id: "",
          companyID: "",
          precinctName: "",
          precinctShortName: "",
          provinceID: "",
          cityID: "",
          areaID: "",
          address: "",
          status: "0",
          lngLat: "",
          contact: "",
          serviceCall: ""
        },
        villageRules: {
          companyID: [{ required: true, trigger: 'change',message: '请选择所属公司'}],
          precinctName: [{ required: true, trigger: 'change',message: '请填写小区名称'}],
          precinctShortName: [{ required: true, trigger: 'change',message: '请填写小区简称'}],
          provinceID: [{ required: true, trigger: 'change',message: '请选择省'}],
          cityID: [{ required: true, trigger: 'change',message: '请选择市'}],
          areaID: [{ required: true, trigger: 'change',message: '请选择区/县'}],
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

    methods: {
      /**
       * @init 初始化
       */
      initForm(){
        if(this.type === 'edit'){
          //get 初始化数据
          getPrecinctInfo().then((data)=>{
            this.villageModel = data.resultData.o2oPropertyPrecinctVo;
            this.getCity();
            this.getArea();
            this.$nextTick(()=>{
              this.initMap(...this.villageModel.lngLat.split(','));
            });
          })
        }else{
          this.$nextTick(()=>{
            this.initMap();
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
        let province = this.translateAreaByCode(this.provinceList, this.villageModel.provinceID);
        let city = this.translateAreaByCode(this.cityList, this.villageModel.cityID);
        let area = this.translateAreaByCode(this.areaList, this.villageModel.areaID);
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
          this.villageModel.cityID = '';
          this.villageModel.areaID = '';
          if(val){
            this.getCity()
          }
      },

      /**
       * 市改变
       */
      cityChange(val){
        this.areaList = [];
        this.villageModel.areaID = '';
        if(val){
          this.getArea();
        }
      },

      /**
       *  表单提交
       */
      submit(){
        this.$refs.villageForm.validate((valid)=>{
          if(valid){
            this.submitLoading = true
            savePrecinctInfo(this.villageModel).then((data)=>{
              this.submitLoading = false;
              this.showDialog = false;
            }, ()=>{
              this.$message.error('保存失败');
              this.submitLoading = false;
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
        getAreaList({parentId: '1'}).then((data)=>{
          this.provinceList = data.resultData || [];
        });
      },

      /**
       * 获取市
       */
      getCity(){
        getAreaList({parentId: this.villageModel.provinceID, type: 'city'}).then((data)=>{
          this.cityList = data.resultData || [];
        });
      },

      /**
       * 获取区
       */
      getArea(){
        getAreaList({parentId: this.villageModel.cityID, type: 'area'}).then((data)=>{
          this.areaList = data.resultData || [];
        });
      },
    },

    mounted(){
     this.getProvince();
      if(window.BMap) return
      this.MP();
    }
  };
</script>

<style scoped>

</style>
