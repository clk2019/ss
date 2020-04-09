var Myindexnew = {
  data () {
    return {
      newData: {},
      newListData: [],
      searchConf: {
        pageNum: 1,
        pageSize: 9,
      },
    };
  },
  created () {
    //debugger;
    this.newDatanav();
    this.newList();
  },
  methods: {
    //获取地址字典
    newDatanav () {
      axios.get('http://appi.toustone.cn/new/latest').then(res =>{
        res = res.data;
        if (res.code === 0) {
          this.newData = res.data;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
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
  template:`<div class="item_container clearfix mt10">
              <div id="head_list" class="clearfix pb10">
                  <a class="fr pt25 col2 pr20" href="cn-newcenter.html">查看更多</a>
              </div>
              <div class="p20">
                <div style="display: block;" class="clearfix">
                  <span class="index-tab-left" id="newRecommen">
                    <p><img :src="newData.image" style="height:232px;"></p>
                    <p class="fz-16 fb mt20"><a :href="'cn-newnav.html?newId='+newData.newId" class="col2">{{newData.title}}</a></p>
                    <p class="fz-14 lh25 col2 mt10">{{newData.summary}}<a :href="'cn-newnav.html?newId='+newData.newId" class="pl10">[查看全文]</a></p>
                  </span>
                  <span class="index-tab-right">
                    <ul>
                      <li v-for="item in newListData"><a :href="'cn-newnav.html?newId='+item.newId">{{item.title}}</a><span class="col4">[{{item.publishTime}}]</span></a>
                      </li>
                    </ul>
                  </span>
                </div>
              </div>
            </div>`
}
