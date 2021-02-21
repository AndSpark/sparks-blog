<template>
  <div id="RegisterDialog">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-icon class="text-h4 mr-3">mdi-account-plus</v-icon>
          <span class="headline">用户注册</span>
        </v-card-title>
        <v-form @submit.prevent="register">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="用户名*"
                    required
                    v-model="registerModel.username"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="邮箱*"
                    required
                    v-model="registerModel.email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="密码*"
                    type="password"
                    v-model="registerModel.password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" v-if="isRegisterError">
                  <v-subheader>
                    <v-icon color="danger">mdi-alert-circle</v-icon>
                    注册失败！{{ errorMessage }}
                  </v-subheader>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
            <v-btn color="blue darken-1" text type="submit"> 注册 </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="isRegisterSuccess" centered timeout="3000"
      ><v-icon color="green">mdi-check</v-icon> 注册成功！</v-snackbar
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, mixins } from 'nuxt-property-decorator'
import { setToken } from '~/common/script/common'
@Component({})
export default class RegisterDialog extends Vue {
  registerModel: any = {
    username: '',
    password: '',
    email: '',
  }
  isRegisterSuccess = false
  isRegisterError = false
  errorMessage = ''

  @Prop({ type: Boolean, default: false })
  dialog!: boolean

  close() {
    for (const key in this.registerModel) {
      this.registerModel[key] = ''
    }
    this.$emit('update:dialog', false)
  }

  async register() {
    try {
      let { data } = await this.$axios.post('auth/register', {
        user: this.registerModel,
      })
      setToken(data.token.token, data.token.expires, this.$axios)
      this.isRegisterSuccess = true
      this.close()
      this.$store.commit('updateUserInfo', data.user)
    } catch (error) {
      this.isRegisterError = true
      this.errorMessage = error.response.data.message
    }
  }
}
</script>

<style lang="scss"></style>
