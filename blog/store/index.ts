interface state {
  userInfo: userInfo
}

export const state = ():state => ({
  userInfo: {
    id: '',
    uid: 0,
    username: '',
    email: '',
    avatar: '',
    bio: '',
    followeeCount: 0,
    followersCount: 0,
    articlesCount: 0,
    articlesViewCount: 0,
  }
})

export const mutations = {
  updateUserInfo(state:any,userInfo:userInfo) {
    state.userInfo = userInfo
  }
}