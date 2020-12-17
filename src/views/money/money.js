import DataCard from '@/components/DataCard'
import { getList as getOrderList } from '@/api/order'
import { getList as getWithdrawList } from '@/api/withdraw'
import { getCountNum } from '@/api/money'
import OrderListCard from '@/views/order/OrderListCard'
import WithdrawListItem from '@/views/money/Withdraw/WithdrawListItem'
import moment from 'moment'

export default {
  components: { DataCard, OrderListCard, WithdrawListItem },
  data() {
    return {
      radio1: '今日',
      radio2: '1',
      nums: [
        {
          num: '...',
          label: '账户余额'
        },
        {
          num: '...',
          label: '提现总额'
        }, {
          num: '...',
          label: '待提现支出'
        }, {
          num: '...',
          label: '推广费总额'
        }
      ],
      listQuery: {
        page: 1,
        limit: 10,
        andQuery: {
          status: 1
        }
      },
      total: 0,
      list: null,
      listLoading: true,
      listQuery2: {
        page: 1,
        limit: 10,
        andQuery: {
          status: 1
        }
      },
      total2: 0,
      list2: null,
      listLoading2: true
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
      getCountNum().then(res => {
        for (let i = 0; i < this.nums.length; i++) {
          this.nums[i].num = '￥' + (res.data[i] / 100.0).toFixed(2)
        }
      })
      const queryData = this.listQuery
      if (this.radio1 === '今日') {
        queryData.startTime = moment().day(moment().day()).startOf('day').format('YYYY-MM-DD HH:mm:ss')
        queryData.endTime = moment().day(moment().day()).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      } else if (this.radio1 === '本周') {
        queryData.startTime = moment().week(moment().week()).startOf('week').format('YYYY-MM-DD HH:mm:ss')
        queryData.endTime = moment().week(moment().week()).endOf('week').format('YYYY-MM-DD HH:mm:ss')
      } else if (this.radio1 === '本月') {
        queryData.startTime = moment().month(moment().month()).startOf('month').format('YYYY-MM-DD HH:mm:ss')
        queryData.endTime = moment().month(moment().month()).endOf('month').format('YYYY-MM-DD HH:mm:ss')
      } else if (this.radio1 === '本年') {
        queryData.startTime = moment().year(moment().year()).startOf('year').format('YYYY-MM-DD HH:mm:ss')
        queryData.endTime = moment().year(moment().year()).endOf('year').format('YYYY-MM-DD HH:mm:ss')
      }
      getOrderList(queryData).then(response => {
        const listData = response.data.records
        listData.forEach(item => {
          item.goodsCover = process.env.VUE_APP_IMAGE_URL + item.goodsCover
        })
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
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
    handleRadioChange(label) {
      this.fetchData()
      this.fetchData2()
    },
    handleTabClick(tab) {
      if (tab.name === '1') {
        this.fetchData()
      } else {
        this.fetchData2()
      }
    },
    fetchData2() {
      this.listLoading2 = true
      const queryData = this.listQuery2
      if (this.radio1 === '今日') {
        queryData.startTime = moment().day(moment().day()).startOf('day').format('YYYY-MM-DD HH:mm:ss')
        queryData.endTime = moment().day(moment().day()).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      } else if (this.radio1 === '本周') {
        queryData.startTime = moment().week(moment().week()).startOf('week').format('YYYY-MM-DD HH:mm:ss')
        queryData.endTime = moment().week(moment().week()).endOf('week').format('YYYY-MM-DD HH:mm:ss')
      } else if (this.radio1 === '本月') {
        queryData.startTime = moment().month(moment().month()).startOf('month').format('YYYY-MM-DD HH:mm:ss')
        queryData.endTime = moment().month(moment().month()).endOf('month').format('YYYY-MM-DD HH:mm:ss')
      } else if (this.radio1 === '本年') {
        queryData.startTime = moment().year(moment().year()).startOf('year').format('YYYY-MM-DD HH:mm:ss')
        queryData.endTime = moment().year(moment().year()).endOf('year').format('YYYY-MM-DD HH:mm:ss')
      }
      getWithdrawList(queryData).then(response => {
        this.list2 = response.data.records
        this.listLoading2 = false
        this.total2 = response.data.total
      })
    },
    fetchNext2() {
      this.listQuery2.page = this.listQuery2.page + 1
      this.fetchData2()
    },
    fetchPrev2() {
      this.listQuery2.page = this.listQuery2.page - 1
      this.fetchData2()
    },
    fetchPage2(page) {
      this.listQuery2.page = page
      this.fetchData2()
    },
    changeSize2(limit) {
      this.listQuery2.limit = limit
      this.fetchData2()
    }
  }
}
