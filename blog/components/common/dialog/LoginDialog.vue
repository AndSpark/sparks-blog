<template>
  <div id="LoginDialog">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-icon class="text-h4 mr-3">mdi-account</v-icon>
          <span class="headline">用户登录</span>
        </v-card-title>
        <v-form @submit.prevent="login">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="邮箱"
                    required
                    v-model="loginModel.email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="密码"
                    type="password"
                    v-model="loginModel.password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" v-if="isLoginError">
                  <v-subheader>
                    <v-icon color="danger">mdi-alert-circle</v-icon>
                    登录失败！{{ errorMessage }}
                  </v-subheader>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
            <v-btn color="blue darken-1" text type="submit"> 登录 </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="isLoginSuccess" centered timeout="3000"
      ><v-icon color="success">mdi-check</v-icon> 登录成功！</v-snackbar
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { setToken } from '@/common/script/common.ts'
@Component({})
export default class LoginDialog extends Vue {
  loginModel: any = {
    username: '',
    password: '',
    email: '',
  }
  isLoginSuccess = false
  isLoginError = false
  errorMessage = ''

  @Prop({ type: Boolean, default: false })
  dialog!: boolean

  close() {
    for (const key in this.loginModel) {
      this.loginModel[key] = ''
    }
    this.$emit('update:dialog', false)
  }

  async login() {
    try {
      let { data } = await this.$axios.post('auth/login', {
        user: this.loginModel,
      })
      setToken(data.token.token, data.token.expires, this.$axios)
      this.isLoginSuccess = true
      this.close()
      this.$store.commit('updateUserInfo', data.user)
    } catch (error) {
      this.isLoginError = true
      this.errorMessage = error.response.data.message
    }
  }
}
</script>

<style lang="scss"></style>
