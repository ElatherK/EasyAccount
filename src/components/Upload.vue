<template>
  <div>
    <a-modal v-model="visible" title="导入账单" @cancel="handleCancel">
      <a-upload-dragger
        name="file"
        :fileList="fileList"
        :before-upload="beforeChange"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">点击或拖拽上传文件</p>
        <p class="ant-upload-hint">支持excel文件格式上传账单信息</p>
      </a-upload-dragger>
      <div slot="footer">
        <a-button @click="handleOk">上传</a-button>
        <a-button @click="visible = !visible">取消</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
import * as XLSX from "xlsx/xlsx.mjs";
export default {
  name: "UploadModal",
  data() {
    return {
      visible: false,
      file: null,
      fileList:[]
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    async handleOk() {
      let data = await this.readFile(this.file);
      let workbook = XLSX.read(data, { type: "binary" }); //解析二进制格式数据
      console.log(workbook);
      let worksheet = workbook.Sheets[workbook.SheetNames[0]]; //获取第一个Sheet
      let result = XLSX.utils.sheet_to_json(worksheet); //json数据格式
      console.log(result,'####reesult');
    },
    beforeChange(file) {
      this.file = file
      if (file.name.split('.')[1] !== 'xlsx') {
          this.$message.error('文件格式不正确,请上传xlsx类型文件')
      }else{
          this.fileList.push(file)
      }
      console.log(file);
    //   console.log(file);
    //   let data = await this.readFile(file);
    //   let workbook = XLSX.read(data, { type: "binary" }); //解析二进制格式数据
    //   console.log(workbook);
    //   let worksheet = workbook.Sheets[workbook.SheetNames[0]]; //获取第一个Sheet
    //   let result = XLSX.utils.sheet_to_json(worksheet); //json数据格式
    //   console.log(result,'####reesult');
      return false;
    },
    handleChange() {
      console.log("???");
    },
    handleCancel() {
      this.visible = false;
      this.$emit("close");
    },
    readFile(file) {
      //文件读取
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file); //以二进制的方式读取
        reader.onload = (ev) => {
          resolve(ev.target.result);
        };
      });
    },
  },
};
</script>