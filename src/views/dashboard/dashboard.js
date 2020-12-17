import DataCard from '@/components/DataCard'
import { countNum } from '@/api/dashboard'
import fa from 'element-ui/src/locale/lang/fa'

export default {
  components: { DataCard },
  data() {
    return {
      radio1: '今日',
      nums: [
        {
          num: '0人',
          label: '代理商'
        },
        {
          num: '0人',
          label: '一级经销商'
        }, {
          num: '0人',
          label: '二级经销商'
        }, {
          num: '0人',
          label: '用户总数'
        }, {
          num: '0笔',
          label: '保单总量'
        }, {
          num: '￥0',
          label: '保单总额'
        }, {
          num: '￥0',
          label: '推广费总额'
        }, {
          num: '￥0',
          label: '提现总额'
        }
      ],
      loading: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.fetchDate()
    },
    fetchDate() {
      // const loadingInstance = this.$loading({})
      // console.log(loadingInstance)
      this.loading = true
      countNum(this.radio1).then(res => {
        this.nums = res.data
        // loadingInstance.close()
        this.loading = false
      }).catch(() => {
        // loadingInstance.close()
        this.loading = false
      })
    },
    handleRadioChange(label) {
      this.fetchDate()
    }
  }
}
