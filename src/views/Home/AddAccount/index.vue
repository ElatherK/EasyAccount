<template>
  <div class="container">
    <div class="header">
      <a-button @click="showModal">导入账单</a-button>
    </div>
    <div class="body">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="name" label="项目名" prop="name" placeholder="输入账目名称">
          <a-input
            v-model="form.name"
            @blur="
              () => {
                $refs.name.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="收入/支出" prop="type">
          <a-select v-model="form.type" placeholder="选择收入/支出">
            <a-select-option :value="0"> 支出 </a-select-option>
            <a-select-option :value="1"> 收入 </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="时间" required prop="date">
          <a-date-picker
            v-model="form.date"
            show-time
            type="date"
            placeholder="选择时间"
            style="width: 100%"
          />
        </a-form-model-item>
        <a-form-model-item label="账目类型" prop="category">
          <a-select v-model="form.category" placeholder="选择账目类型">
            <a-select-option :value="1"><span>餐饮美食</span></a-select-option>
            <a-select-option :value="2"><span>购物</span></a-select-option>
            <a-select-option :value="3"><span>交通出行</span></a-select-option>
            <a-select-option :value="4"><span>娱乐</span></a-select-option>
            <a-select-option :value="5"><span>住宿物业</span></a-select-option>
            <a-select-option :value="6"><span>医疗健康</span></a-select-option>
            <a-select-option :value="7"><span>投资理财</span></a-select-option>
            <a-select-option :value="9"><span>工资收入</span></a-select-option>
            <a-select-option :value="8"><span>其他</span></a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="金额" prop="money">
          <a-input
            v-model="form.money"
          />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit"> 提交 </a-button>
          <a-button style="margin-left: 10px" @click="resetForm">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <UploadModal v-if="isShow" ref="uploadModal" @close="closeModal"></UploadModal>
    </div>
  </div>
</template>
<script>
import UploadModal from '@/components/Upload.vue'
export default {
  name: "ViewAccount",
  components:{
    UploadModal
  },
  data() {
    return {
      isShow:false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        date: undefined,
        name: "",
        type: undefined,
        category: undefined,
        money: "",
      },
      rules: {
        name: [
          { required: true, message: "项目名不能为空哦~", trigger: "blur" },
        ],
        date: [{ required: true, message: "请选择时间~", trigger: "change" }],
        type: [
          { required: true, message: "收入还是支出呢?@_@", trigger: "change" },
        ],
        category: [
          { required: true, message: "请选择具体类型~", trigger: "change" },
        ],
        money: [{ required: true, message: "How much?", trigger: "change" }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.form);
          this.form.money = Number(this.form.money)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    showModal(){
      this.isShow = true
      this.$nextTick(()=>{
        this.$refs.uploadModal.open()
      })
    },
    closeModal(){
      this.isShow = false
    }
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 72px;
  padding-right: 72px;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
  }
}
</style>