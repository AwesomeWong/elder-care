<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="title-container">
        <h1 class="title">
          <img src="@/assets/test-img/logofull.png" alt="" class="logo" />
        </h1>
      </div>
      <login />
    </div>
    <div class="companyFooter">
      Copyright @ 2019-2020 Tencent. All Rights Reserved
    </div>
  </div>
</template>

<script setup lang="ts">
import Login from './components/Login.vue'
</script>

<style lang="less" scoped>
@import url('./index.less');
.login-wrapper {
  position: relative;
  .companyFooter {
    position: absolute;
    bottom: 0;
    background-color: transparent;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
  }
}
.logo {
  width: 218px;
  height: 52px;
}
</style>
