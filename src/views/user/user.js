import { getList, getUserNum, getInviteCode } from '@/api/distributor'
import DataCard from '@/components/DataCard'
import InfoCard from '@/views/user/InfoCard'

export default {
  components: { DataCard, InfoCard },
  name: 'Users',
  data() {
    return {
      formVisible: false,
      listQuery: {
        page: 1,
        limit: 10,
        userType: undefined,
        like: ''
      },
      total: 0,
      list: null,
      listLoading: true,
      userType: '1',
      nums: ['...', '...', '...'],
      addButtonLoading: false
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
      queryData.userType = this.userType
      getList(queryData).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
      getUserNum().then(res => {
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
    toDetail(item) {
      this.$router.push('/user/userDetail/' + item.id)
    },
    add() {
      this.addButtonLoading = true
      getInviteCode().then(res => {
        this.addButtonLoading = false
        this.$alert(res.data, '系统邀请码', {
          confirmButtonText: '确定'
        }).then(() => {})
      }).catch(() => { this.addButtonLoading = false })
    }

  }
}
