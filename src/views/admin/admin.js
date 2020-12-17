import { getList, changeStatus, save } from '@/api/admin'

export default {
  name: 'Admins',
  data() {
    return {
      formVisible: false,
      formLoading: false,
      formTitle: '添加账号',
      deptList: [],
      isAdd: true,
      form: {
        phone: '',
        name: ''
      },
      total: 0,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { max: 11, min: 11, message: '请输入11位手机号', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
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
      getList({}).then(response => {
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
    resetForm() {
      this.$refs['dialogForm'].clearValidate()
    },
    add() {
      this.formTitle = '添加账号'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      this.$refs['dialogForm'].validate((valid) => {
        if (valid) {
          this.formLoading = true
          save({
            phone: this.form.phone,
            name: this.form.name
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
    },
    remove(row, status) {
      const id = row.id

      this.$confirm(`确定${status === 1 ? '禁用' : '启用'}该用户吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        changeStatus(id, status).then(response => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          row.status = status
        })
      }).catch(() => {
      })
    }

  }
}
