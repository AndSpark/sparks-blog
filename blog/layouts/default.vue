<template>
  <v-app id="inspire">
    <pointer></pointer>
    <div class="live2d-main">
      <canvas id="live2d" class="live2d" width="200" height="400"></canvas>
      <div class="fui-eye"></div>
    </div>

    <v-app-bar app height="80">
      <v-container class="py-0 fill-height">
        <v-toolbar-title class="text-h4 font-weight-light"
          >Spark</v-toolbar-title
        >
        <v-spacer></v-spacer>

        <v-menu
          offset-y
          open-on-hover
          :disabled="!isLogin"
          transition="slide-x-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-subheader
              @click="menuClick"
              v-bind="attrs"
              v-on="on"
              class="portrait"
            >
              <v-avatar color="grey darken-1" size="32" class="mr-2">
                <v-img :src="avatar"></v-img>
              </v-avatar>
              <span>{{ username }}</span>
            </v-subheader>
          </template>
          <v-list>
            <v-list-item link :to="`/profile/${userInfo.uid}`">
              <v-subheader>个人信息</v-subheader>
            </v-list-item>
            <v-list-item link @click="logout">
              <v-subheader>退出账号</v-subheader>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="3">
            <side-menu
              :isLogin="isLogin"
              :isShowLoginForm.sync="isShowLoginForm"
              :isShowRegisterForm.sync="isShowRegisterForm"
            ></side-menu>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg" class="pa-5" elevation="1">
              <nuxt></nuxt>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <register-dialog :dialog.sync="isShowRegisterForm"></register-dialog>
      <login-dialog :dialog.sync="isShowLoginForm"> </login-dialog>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import RegisterDialog from '~/components/common/dialog/RegisterDialog.vue'
import LoginDialog from '~/components/common/dialog/LoginDialog.vue'
import SideMenu from '~/components/SideMenu.vue'
import Pointer from '~/components/common/Pointer/Pointer.vue'
@Component({
  components: {
    RegisterDialog,
    LoginDialog,
    SideMenu,
    Pointer,
  },
})
export default class Default extends Vue {
  selectedItem = 0
  links = [
    {
      icon: 'mdi-apps',
      title: 'Welcome',
      to: '/',
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Inspire',
      to: '/inspire',
    },
  ]
  isShowLoginForm = false
  isShowRegisterForm = false

  mounted() {
    this.tokenLogin()
  }

  async tokenLogin() {
    let token = localStorage.getItem('token')
    if (token) {
      let tokenObj = JSON.parse(token)
      if (tokenObj.expires > new Date().getTime()) {
        this.$axios.setToken(tokenObj.token, 'Bearer')
        let { data } = await this.$axios.get('user')
        this.$store.commit('updateUserInfo', data.user)
      }
    }
  }

  get userInfo(): userInfo {
    return this.$store.state.userInfo
  }

  get isLogin() {
    return this.userInfo.username ? true : false
  }

  get username() {
    return this.isLogin ? this.userInfo.username : '请登录'
  }

  get avatar() {
    return this.isLogin ? this.userInfo.avatar : 'https://picsum.photos/200'
  }

  menuClick() {
    if (this.isLogin) {
      return
    }
    this.isShowLoginForm = true
  }

  updateUserInfo(userinfo: any) {
    this.$store.commit('updateUserInfo', userinfo)
  }

  logout() {
    localStorage.removeItem('token')
    this.$axios.setToken(false)
    this.$store.commit('updateUserInfo', {})
  }
}
</script>

<style lang="scss">
.v-main {
  background-image: url(~@/assets/images/bg8.jpg);
  background-repeat: repeat;
}
.live2d-main {
  position: fixed;
  top: calc(100% - 400px);
  left: 0;
  z-index: 100;
  font-size: 0;
  transition: all 0.3s ease-in-out;
  transform: translateY(3px);
  &:hover {
    transform: translateY(0);
  }
  #live2d {
    position: relative;
  }
}
</style>
