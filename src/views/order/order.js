import { getList, getSum } from '@/api/order'
import DataCard from '@/components/DataCard'
import OrderListCard from '@/views/order/OrderListCard'

export default {
  components: { DataCard, OrderListCard },
  name: 'Orders',
  data() {
    return {
      formVisible: false,
      listQuery: {
        page: 1,
        limit: 10,
        desc: true,
        andQuery: {
          status: '1'
        },
        likeQuery: undefined
      },
      likeQuery: {
        bdNo: ''
      },
      total: 0,
      list: null,
      listLoading: true,
      nums: [0, 0]

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
      if (this.listQuery.andQuery.status === '1') {
        this.listQuery.likeQuery = this.likeQuery
      } else {
        this.listQuery.likeQuery = undefined
      }
      getList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
        this.list.forEach(item => {
          item.goodsCover = process.env.VUE_APP_IMAGE_URL + item.goodsCover
        })
      })
      getSum().then(res => {
        this.nums = res.data
      })
    },
    search() {
      this.fetchData()
    },
    fetchNext() {
      this.listQuery.page = this.listQuery.page + 1
      this.fetchData()
    },
    fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1
      this.fetchData()
    },
    fetchPage(page) {
      this.listQuery.page = page
      this.fetchData()
    },
    changeSize(limit) {
      this.listQuery.limit = limit
      this.fetchData()
    },
    download(row) {

    },
    handleClickCard(item) {
      this.$router.push('/order/orderDetail/' + item.id)
    }
  }
}
