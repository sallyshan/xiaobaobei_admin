import { getList, save } from '@/api/goods'
import GoodsCard from '@/views/goods/GoodsCard'

export default {
  components: { GoodsCard },
  name: 'GoodsMgr',
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        status: 0
      },
      listQuery2: {
        page: 1,
        limit: 10,
        status: 1
      },
      total: 0,
      total2: 0,
      list: null,
      list2: null,
      listLoading: true,
      listLoading2: true,
      status: '0'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      const queryData = this.listQuery
      getList(queryData).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
        this.list.forEach(goods => {
          goods.cover = process.env.VUE_APP_IMAGE_URL + goods.covers[0]
          goods.proportion = (goods.proportion / 10.0).toFixed(1)
          goods.proportion1 = (goods.proportion1 / 10.0).toFixed(1)
          goods.proportion2 = (goods.proportion2 / 10.0).toFixed(1)
          goods.proportionBalance = (goods.proportionBalance / 10.0).toFixed(1)
        })
      })
    },
    fetchData2() {
      this.listLoading2 = true
      const queryData = this.listQuery2
      getList(queryData).then(response => {
        this.list2 = response.data.records
        this.listLoading2 = false
        this.total2 = response.data.total
        this.list2.forEach(goods => {
          goods.cover = process.env.VUE_APP_IMAGE_URL + goods.covers[0]
          goods.proportion = (goods.proportion / 10.0).toFixed(1)
          goods.proportion1 = (goods.proportion1 / 10.0).toFixed(1)
          goods.proportion2 = (goods.proportion2 / 10.0).toFixed(1)
          goods.proportionBalance = (goods.proportionBalance / 10.0).toFixed(1)
        })
      })
    },
    fetchNext() {
      this.listQuery.page = this.listQuery.page + 1
      this.fetchData()
    },
    fetchNext2() {
      this.listQuery2.page = this.listQuery2.page + 1
      this.fetchData2()
    },
    fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1
      this.fetchData()
    },
    fetchPrev2() {
      this.listQuery2.page = this.listQuery2.page - 1
      this.fetchData2()
    },
    fetchPage(page) {
      this.listQuery.page = page
      this.fetchData()
    },
    fetchPage2(page) {
      this.listQuery2.page = page
      this.fetchData2()
    },
    changeSize(limit) {
      this.listQuery.limit = limit
      this.fetchData()
    },
    changeSize2(limit) {
      this.listQuery2.limit = limit
      this.fetchData2()
    },
    handleTabChange() {
      if (this.status === '0') {
        this.fetchData()
      } else {
        this.fetchData2()
      }
    },
    changeStatus(item, status) {
      save({
        id: item.id,
        status: status
      }).then(res => {
        this.$message.success('操作成功')
        if (status === 1) {
          this.fetchData()
        } else {
          this.fetchData2()
        }
      })
    },
    toEdit(id) {
      this.$router.push('./goodsEdit/' + id)
    }

  }
}
