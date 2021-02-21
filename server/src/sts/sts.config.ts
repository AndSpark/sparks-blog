
const env = process.env
const config = {
  AccessKeyId: env.ALI_SDK_STS_ID,
  AccessKeySecret: env.ALI_SDK_STS_SECRET,
  RoleArn: env.ALI_SDK_STS_ROLE,
  // 建议 Token 失效时间为 1 小时
  TokenExpireTime: 3600,
  Policy:`{
    "Statement": [
      {
        "Action": [
          "oss:*"
        ],
        "Effect": "Allow",
        "Resource": ["acs:oss:*:*:*"]
      }
    ],
    "Version": "1"
  }
  `
}

export {config}
