<template>
  <el-card shadow="hover">
    <div class="info-card-container">
      <div class="img-container">
        <el-image :src="user.wxHead"/>
      </div>
      <div class="right-container">
        <div class="right-container-top">
          <div class="top-item">
            <span class="name">{{ user.wxName }}</span>
            <span class="phone">手机：{{ user.phone }}</span>
<!--            <span>企业名称：{{ user.businessName }}</span>-->
            <span class="fit"/>
          </div>
          <div class="top-item">
            <span class="name">注册时间：{{ user.createTime }}</span>
            <span class="phone">
              <span v-if="user.userType === 1">团队一级经销商: {{ user.cityNum }}人, </span>
              <span v-if="user.userType === 1 || user.userType === 2">团队二级经销商：{{ user.countyNum }}人</span>
              <span>&nbsp;</span>
            </span>
<!--            <span>统一信用代码：{{ user.unifiedCreditCode }}</span>-->
            <span class="fit"/>
          </div>
        </div>
        <div class="right-container-bottom">
          <span>销售保单：{{ user.sellNum }}笔</span>
          <span>保单总额：￥{{ (user.sellTotalMoney/100).toFixed(2) }}</span>
          <span>账户余额：￥{{ (user.balance/100).toFixed(2) }}</span>
        </div>
      </div>
      <div style="text-align: right">
        <span v-show="user.userType !== 1" style="margin-bottom: 10px">所属代理商：{{ user.provinceName }}</span>
        <p/>
        <slot name="rightButton"/>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    user: {
      type: Object,
      default: function() {
        return {
          pId: '',
          gId: '',
          wxOpenid: '',
          wxName: '',
          wxHead: '',
          phone: '',
          username: '',
          password: '',
          salt: '',
          businessName: '',
          unifiedCreditCode: '',
          sellNum: '',
          sellTotalMoney: '',
          account: '',
          userType: '',
          createTime: '',
          updateTime: '',
          id: '',
          cityNum: 0,
          countyNum: 0,
          provinceName: ''
        }
      },
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-card {
    margin-bottom: 6px;
  }
  .info-card-container {
    min-width: 500px;
    /*height: 140px;*/
    display: flex;
    padding-top: 10px;
    font-size: 14px;

    .img-container {
      height: 100%;
      margin-right: 20px;

      .el-image {
        width: 76px;
        height: 76px;
        border-radius: 999px;
      }
    }

    .right-container {
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;

      .right-container-top {
        display: flex;
        flex-direction: row;
        flex: 3;

        .top-item {
          display: flex;
          flex-direction: column;
          flex: 1;
          .fit {
            flex: 1;
          }

          .name, .phone{
            margin-bottom: 10px;
          }
        }
      }

      .right-container-bottom {
        margin-top: 20px;
        flex: 1;
        span {
          margin-right: 40px;
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .el-button {
      margin-top: 20px;
    }
  }
</style>
