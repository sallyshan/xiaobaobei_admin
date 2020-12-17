import { getList, save } from '@/api/rebateRatio'

export default {
  name: 'RebateRatio',
  data() {
    return {
      formVisible: false,
      formLoading: false,
      formTitle: '编辑佣金比例',
      isAdd: true,
      form: {
        type: '',
        agent1: '',
        agent2: '',
        agent3: ''
      },

      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
      list: null,
      listLoading: true,
      rules: {
        agent1: [
          {
            pattern: /(^(([0-9]([0-9])?)|(0))(\.[0-9])?$)/,
            message: '比例格式不正确',
            trigger: 'blur'
          }
        ],
        agent2: [
          {
            pattern: /(^(([0-9]([0-9])?)|(0))(\.[0-9])?$)/,
            message: '比例格式不正确',
            trigger: 'blur'
          }
        ],
        agent3: [
          {
            pattern: /(^(([0-9]([0-9])?)|(0))(\.[0-9])?$)/,
            message: '比例格式不正确',
            trigger: 'blur'
          }
        ]
      }
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
        this.list.forEach(item => {
          item.agent1 = (item.agent1 / 10.0).toFixed(1)
          item.agent2 = (item.agent2 / 10.0).toFixed(1)
          item.agent3 = (item.agent3 / 10.0).toFixed(1)
        })
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
    resetForm() {
      this.$refs['dialogForm'].clearValidate()
    },
    add() {
      this.formTitle = '添加佣金比例'
      this.formVisible = true
      this.isAdd = true
    },
    edit(row) {
      this.isAdd = false
      this.form = JSON.parse(JSON.stringify(row))
      this.formTitle = '编辑佣金比例'
      this.formVisible = true
    },
    save() {
      this.$refs['dialogForm'].validate((valid) => {
        if (valid) {
          this.formLoading = true
          save({
            // type: this.form.type,
            agent1: this.form.agent1 * 10,
            agent2: this.form.agent2 * 10,
            agent3: this.form.agent3 * 10,
            id: this.form.id
          }).then(response => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.fetchData()
            this.formVisible = false
          }).finally(() => {
            this.formLoading = false
          })
        } else {
          return false
        }
      })
    }
    // remove(row) {
    //   const id = row.id
    //   this.$confirm(this.$t('common.deleteConfirm'), this.$t('common.tooltip'), {
    //     confirmButtonText: this.$t('button.submit'),
    //     cancelButtonText: this.$t('button.cancel'),
    //     type: 'warning'
    //   }).then(() => {
    //     remove(id).then(response => {
    //       this.$message({
    //         message: this.$t('common.optionSuccess'),
    //         type: 'success'
    //       })
    //       this.fetchData()
    //     })
    //   }).catch(() => {
    //   })
    // }

  }
}
