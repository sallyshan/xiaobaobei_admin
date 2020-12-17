<template>
  <el-card shadow="hover">
    <div style="display: flex;height: 100px">
      <el-image
        style="width: 100px; height: 100%;"
        :src="goods.cover"
        fit="cover"
      />
      <div style="height: 100px;margin-left: 10px">
        <div class="goods-title">
          {{ goods.title }}
        </div>
        <div style="font-size: 12px;padding-top: 10px">
          <div v-for="(item, index) in goods.skuList" :key="index">
            <span>规格 {{ index + 1 }}：{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div style="flex: 1;text-align: center;padding-top: 50px;font-size: 12px">
        <span>保费：{{ goods.skuList[0].children && goods.skuList[0].children.length > 0 ? goods.skuList[0].children[0].insureAmount : goods.skuList[0].insureAmount }}</span>
      </div>
      <div style="width: 200px;height: 100%;text-align: center">
        <slot name="right-content"/>
      </div>
    </div>
    <p/>
    <div style="font-size: 13px">
      <span style="margin-right: 10px">代理商推广比例：{{ goods.proportion }}%</span>
      <span style="margin-right: 10px">一级经销商推广费比例：{{ goods.proportion1 }}%</span>
      <span>二级经销商推广费比例：{{ goods.proportion2 }}%</span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'GoodsCard',
  props: {
    goods: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.el-card {
  margin-bottom: 6px;
}
</style>
