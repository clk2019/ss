var MyNewnav = {
	data () {
		return {
		  newNavinfData: {},
		  newId:0
		};
	},
	created () {
		this.newId = this.getQueryString('newId');
		this.newNavinf();
	},
	methods: {
	  //获取地址字典
	    newNavinf () {
			if(!this.newId) return 
		    axios.get('http://appi.toustone.cn/new'+"/"+this.newId).then(res =>{
			   res = res.data;
			  if (res.code === 0) {
				  this.newNavinfData = res.data;
			  } else {
				  this.$Message.error(res.message);
			  }
		    });
	    },
		getQueryString(name){
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			return null;
		}

	},
	template:`<div class="pb40"> 
       <div class="about-nav-title tc" >
        {{newNavinfData.title}}
       </div> 
       <div class="tc mt15 fz-14"> 
        <span class="mr20">{{newNavinfData.publishTime}}</span> 
        <span class="mr20">作者：<i id="newssource">{{newNavinfData.author}}</i></span> 
        <span>来源：<i id="newsAuthor">{{newNavinfData.source}}</i></span>
       </div> 
       <div class="mt20 pb20clearfix"> 
        <div class="new-inf pl10" style="line-height: 35px; font-size: 16px;" v-html="newNavinfData.content">
          
        </div> 
       </div> 
      </div> `
}
