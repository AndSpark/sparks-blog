import { Controller, Get } from '@nestjs/common';
import { STS } from 'ali-oss'
import { config } from './sts.config'

let sts = new STS({
  accessKeyId: config.AccessKeyId,
  accessKeySecret:config.AccessKeySecret
});
@Controller('sts')
export class StsController {
  @Get()
  async sts() { 
    let {credentials} = await sts.assumeRole(config.RoleArn, config.Policy, config.TokenExpireTime)
    return credentials;
  }
}
