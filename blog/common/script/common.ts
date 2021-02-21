import { NuxtAxiosInstance } from '@nuxtjs/axios'
import OSS from 'ali-oss'
function setToken(token:string, expires:string,$axios:NuxtAxiosInstance):void {
  const localStorageToken = {
    token: token,
    expires: expires,
  }
  window.localStorage.setItem('token', JSON.stringify(localStorageToken))
  $axios.setToken(token, 'Bearer')
}

async function uploadAliOSS(file:any,$axios:NuxtAxiosInstance) {
  const { data: credentials } = await $axios.get('sts')
  const client: any = new OSS({
    accessKeyId: credentials.AccessKeyId,
    accessKeySecret: credentials.AccessKeySecret,
    stsToken: credentials.SecurityToken,
    region: process.env.aliOSS_region,
    bucket: process.env.aliOSS_bucket,
  })
  let name = new Date().getTime().toString()
  const res = await client.multipartUpload(name, file, {})
  return { res,client,url:process.env.aliOSS_baseUrl + res.name}
}

export {setToken,uploadAliOSS}