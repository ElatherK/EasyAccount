<template>
  <div class="body">
    <div class="container">
      <div class="header">
        <span class="t-1">你好</span>
        <span class="t-2">欢迎使用EasyAccount</span>
      </div>
      <div class="login" v-if="isActive === 'login'">
        <input type="text" placeholder="输入账号" v-model="login.userName" />
        <input
          type="password"
          placeholder="输入密码"
          v-model="login.password"
        />
        <a-button @click="handleLogin">登录</a-button>
        <a-button type="link" @click="isActive = 'register'"
          ><span class="link">没有账号?快去注册吧</span></a-button
        >
      </div>
      <div class="register" v-if="isActive === 'register'">
        <input
          type="text"
          placeholder="输入注册账号"
          v-model="register.userName"
        />
        <input
          type="password"
          placeholder="输入注册密码"
          v-model="register.password"
        />
        <a-button @click="handleRegister">注册</a-button>
        <a-button type="link" @click="isActive = 'login'"
          ><span class="link">登录去看看吧</span></a-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { login, register } from "@/request/api";
export default {
  data() {
    return {
      isActive: "login",
      login: {
        userName: "",
        password: "",
      },
      register: {
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    handleLogin() {
      console.log(this.login);
      if (this.login.userName && this.login.password) {
        login(this.login).then((res) => {
          if (res.data.status === 1) {
            this.$message.info(res.data.success_msg);
            sessionStorage.setItem("token", res.data.data);
            this.$router.push({ name: "home" });
          } else {
            this.$message.warning(res.data.err_msg);
          }
        });
      } else {
        this.$message.warning("请填写用户名及密码");
      }
    },
    handleRegister() {
      if (this.register.userName && this.register.password) {
        register(this.register).then((res) => {
          if (res.data.status === 1) {
            this.$message.info(res.data.success_msg)
          } else {
            this.$message.warning(res.data.err_msg);
          }
        });
      } else {
        this.$message.warning("请填写用户名及密码");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #a1c4fd, #c2e9fb);
  position: relative;
  .container {
    background-image: linear-gradient(to right, #48c6ef, #6f86d6 200%);
    width: 400px;
    height: 500px;
    border-radius: 5px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    .header {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      text-align: center;
      line-height: 1;
      .t-1 {
        color: #7f7f7f;
        font-size: 50px;
      }
      .t-2 {
        color: #9c9c9c;
        font-size: 30px;
        margin-top: 17px;
      }
    }
    .login,
    .register {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      input {
        width: 100%;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 14px;
      }
      input::placeholder {
        color: #b9b9b9;
      }
      .link {
        color: #b9b9b9;
      }
    }
  }
}
</style>