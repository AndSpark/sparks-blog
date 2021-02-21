"use strict";
exports.__esModule = true;
exports.mutations = exports.state = void 0;
exports.state = function () { return ({
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
        articlesViewCount: 0
    }
}); };
exports.mutations = {
    updateUserInfo: function (state, userInfo) {
        state.userInfo = userInfo;
    }
};
