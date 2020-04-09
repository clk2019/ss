<template>
    <div>
        <div class="our_advantage zixun clearfix" style="padding-bottom: 60px;">
          <div class="advantage_container">
            <div class="our_box index-tab5 mt40" style="font-size: 32px;letter-spacing:15px;padding-top: 80px;">
              请留下联系方式，专业顾问给您专业服务
            </div>
            <div class="zixun_container clearfix index-zixun mt30">
               <Form ref="formItem" :model="formItem" :rules="ruleInline"  :label-width="0">
                  <FormItem class="mt40">
                    <Row :gutter="32">
                      <Col span="12">
                        <FormItem prop="companyName">
                          <Icon class="indexicon company"></Icon>
                          <Input type="text" v-model="formItem.companyName" placeholder="公司名称"></Input>
                        </FormItem>
                      </Col>
                      <Col span="12">
                        <Icon class="indexicon name"></Icon>
                        <FormItem prop="contactName">
                          <Input type="text" v-model="formItem.contactName" placeholder="姓名"></Input>
                        </FormItem>
                      </Col>
                    </Row>
                </FormItem>
                <FormItem class="mt40">
                  <Row :gutter="32">
                    <Col span="12">
                      <FormItem prop="contactPhone">
                        <Icon class="indexicon indexphone"></Icon>
                        <Input type="text" v-model="formItem.contactPhone" placeholder="手机号"></Input>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <Icon class="indexicon address"></Icon>
                      <FormItem prop="contactRegion">
                        <Cascader :data="lableDistrictData" v-model="contactRegion" placeholder="所在地区"></Cascader>
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem class="mt40">
                  <Row :gutter="32">
                    <Col span="24">
                      <FormItem prop="">
                        <Icon class="indexicon message"></Icon>
                        <Input type="textarea" v-model="formItem.commnets" :autosize="{minRows: 4,maxRows: 6}"  placeholder="写明您的具体需求，以便我们安排相应顾问给您服务。"></Input>
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem class="mt40 tc"><Button type="primary" class="index-button zixun-btn" @click="indexComment()" style="padding: 8px 129px !important; font-size: 18px; border-radius: 30px;">立即咨询</Button></FormItem>
               </Form>
            </div>
          </div>
        </div>
        <!--footer-->
        <div class="our_advantage footerbg clearfix" style="padding-bottom: 60px;">
            <div class="advantage_container mt30">
                <Row :gutter="64">
                    <Col span="7">
                        <div class="mt40"><img src="/static/images/guanwangimg/footerlogo.png"></div>
                        <div class="fz-14 col3 mt20" style="line-height: 30px;">Toustone，中文名：点石，大数据精准营销服务平台，总部位于杭州，专业从事于大数据精准营销方案的研发。</div>
                        <p class="fz-16 fb col3 mt20 tl" >关注toustone公众号，获取更多资讯</p>
                        <div class="mt20 tl"><img src="/static/images/guanwangimg/companyewm.png" style="width: 120px;"></div>
                    </Col>
                    <Col span="6">
                        <div class="fz-16 col3 fb" style="margin-top:100px;">广告合作</div>
                        <div class="col10 fz-14 mt10"><Icon type="ios-email" class="fz-26 va pr10"></Icon>service@toustone.cn</div>
                        <div class="mt20 tl"><img src="/static/images/guanwangimg/qrcode.png" style="width: 100px;"></div>
                    </Col>
                    <Col span="6">
                        <div class="fz-16 col3 fb" style="margin-top:100px;">媒体合作</div>
                        <div class="col10 fz-14 mt10"><Icon type="ios-email" class="fz-26 va pr10"></Icon>service@toustone.cn</div>
                        <div class="mt20 tl"><img src="/static/images/guanwangimg/qrcode.png" style="width: 100px;"></div>
                    </Col>
                    <Col span="5">
                        <div class="fz-16 col3 fb" style="margin-top:100px;">数据支持</div>
                        <div class="col10 fz-14 mt10"><Icon type="ios-email" class="fz-26 va pr10"></Icon>service@toustone.cn</div>
                        <div class="mt20 tl"><img src="/static/images/guanwangimg/qrcode.png" style="width: 100px;"></div>
                    </Col>
                </Row>
                <Row class="tc col3 fz-14 fb mt30" >Copyright 2019 Toustone. All rights reserved.   <a class="pl15" href="http://www.beian.miit.gov.cn/" target="_blank">浙ICP备18049283号</a></Row>
            </div>
        </div>
        <div class="yymessage" v-if="flag1">
            请填写完善信息，以便我们为您提供服务！
        </div>
        <div class="yymessage" v-if="flag">
            预约成功！感谢您的预约，稍后会有专业顾问与您联系。
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
              formItem:{contactRegion:"",},
              contactRegion:[],
              lableDistrictData: [],
              flag:false,
              flag1:false,
              ruleInline: {
                    companyName: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' }
                    ],
                    contactPhone: [
                        { required: true, message: '请输入手机', trigger: 'blur' },
                        {pattern:/^[1][3,4,5,7,8][0-9]{9}$/, message:'请输入正确手机号码', trigger:'blur'}
                    ],
                    contactName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    /*contactRegion: [
                        { required: true, message: '请输入所在地区', trigger: 'blur' },
                    ],*/
                },
            };
        },
        created () {
            this.lableDistrict();
        },
        methods: {
          //获取地址字典
          lableDistrict () {
              this.$http({method:'get',url:this.$api.adver.lableDistrict}).then(res =>{
                  if (res.code === 0) {
                      this.lableDistrictData = res.list ==null ? [] : res.list;
                  } else {
                      this.$Message.error(res.msg);
                  }
              });
          },
          indexComment (name) {
            if(this.contactRegion.length > 0 ){
                this.formItem.contactRegion = this.contactRegion[this.contactRegion.length-1];
            }
            if(this.formItem.contactRegion === '' ){
              this.flag1 = true;
              setTimeout(()=>{
                this.flag1 = false;
              },2500)
              return
            }
            this.$refs.formItem.validate((valid) => {
                if (valid) {
                    this.$http({method:'post',url:this.$api.indexComment},this.formItem).then(res=>{
                        if (res.code == 0) {
                            this.flag = true;
                            setTimeout(()=>{
                              this.flag = false;
                            },2500)
                           this.formItem={};
                           this.contactRegion=[];
                        }else {
                            this.$Message.error(res.message);
                        } 
                    })
                }
            }); 
          },
        }
    };
</script>

<style lang="scss" scoped>
  @import '../assets/scss/guangwangcss/indexcss.css';
</style>