var MyNewlist = {
	data () {
		return {
		  newListData: [],
		  searchConf: {
            pageNum: 1,
            pageSize: 10,
        	},
		};
	},
	created () {
		this.newList();
	},
	methods: {
		//分页
        changePage (page) {
            this.searchConf.pageNum = page;
            this.newList();
        },
        //条数
        changeSize (size) {
            this.searchConf.pageSize = size;
            this.newList();
        },
	  	//获取地址字典
	    newList () {
		    axios.get('http://appi.toustone.cn/new/list'+"?pageNum="+this.searchConf.pageNum+"&pageSize="+this.searchConf.pageSize).then(res =>{
			   res = res.data;
			  if (res.code === 0) {
				  this.newListData = res.list ==null ? [] : res.list;
				  this.searchConf.total = res.count;
			  } else {
				  this.$Message.error(res.message);
			  }
		    });
	    },
	},
	template:`<div class="clearfix">
	            <div class="news_item clearfix" v-for="item in newListData">
		            <div class="news_pic_box fl">
			            <img :src="item.image" />
			        </div>
		            <div class="news_title_box fl">
			            <div class="news_item_title">
			             <span><a :href="'cn-newnav.html?newId='+item.newId">{{item.title}}</a></span>
			            </div>
			            <div class="news_item_des">
			             <span>{{item.summary}}</span>
			             <a :href="'cn-newnav.html?newId='+item.newId">[详情]</a>
			            </div>
		            	<p class="col2 fz-14 mt10">发布时间：{{item.publishTime}}</p>
		            </div>
		        </div>
	            <div style="text-align:center;margin-top:30px;">
	            	<Page :total="searchConf.total" :current="searchConf.pageNum" :page-size="searchConf.pageSize" @on-change="changePage" @on-page-size-change="changeSize" show-total></Page>
                </div>
          </div>`
}
