var MyIndexzixun = {
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
		    axios.get('http://appi.toustone.cn/label/district').then(res =>{
			   res = res.data;
			  if (res.code === 0) {
				  this.lableDistrictData = res.list ==null ? [] : res.list;
			  } else {
				  this.$Message.error(res.message);
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
			  },1500)
			  return
			}
			this.$refs.formItem.validate((valid) => {
				if (valid) {
					axios.post('http://app.toustone.cn/index/comment',this.formItem).then(res=>{
						res = res.data;
						if (res.code == 0) {
							this.flag = true;
							setTimeout(()=>{
							  this.flag = false;
							},1500)
						   this.formItem={};
						   this.contactRegion=[];
						}else {
							this.$Message.error(res.message);
						} 
					})
				}
			}); 
	  	},
	},
	template:`<div>
        <div class="indexbannerform">
            <Form  ref="formItem" :model="formItem" :rules="ruleInline" inline class="index-form tc" style="display: flex;">
              <FormItem prop="companyName" class="pr15">
                  <Input type="text" v-model="formItem.companyName" style="width:205px" placeholder="公司名称">
                  </Input>
              </FormItem>
              <FormItem prop="contactName" class="pr15">
                  <Input type="text" v-model="formItem.contactName" placeholder="姓名" style="border-radius: 20px!important; width:205px">
                  </Input>
              </FormItem>
              <FormItem prop="contactPhone" class="pr15">
                  <Input type="text" v-model="formItem.contactPhone" placeholder="手机号" style="border-radius: 20px!important; width:205px">
                  </Input>
              </FormItem>
              <FormItem prop="contactRegion" class="pr15">
                  <Cascader :data="lableDistrictData" v-model="contactRegion" placeholder="所在地区"  style="border-radius: 20px!important; width:205px"></Cascader>
              </FormItem>
              <FormItem>
                  <Button type="primary" style="background: #0066FF; border-radius: 18px; padding: 6px 15px!important; color: #fff; border: 0px;" class="index-button" @click="indexComment()">立即咨询</Button>
              </FormItem>
          </Form>
        <div class="yymessage" v-if="flag1">
            请填写完善信息，以便我们为您提供服务！
        </div>
        <div class="yymessage" v-if="flag">
            预约成功！感谢您的预约，稍后会有专业顾问与您联系。
        </div>
    </div>`
}
