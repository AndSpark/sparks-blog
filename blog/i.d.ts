declare interface credentials {
  SecurityToken: string;
  AccessKeyId: string;
  AccessKeySecret: string;
  Expiration: string;
}

declare interface updateUser {
  email?: string;
  avatar?: string;
  bio?: string;
}

declare interface userInfo {
  id: string;
  uid: number;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  followeeCount: number;
  followersCount: number;
  articlesCount: number;
  articlesViewCount: number;
}

declare interface CreateArticle {
  title: string;
  body: string;
  description: string;
  tagList: string[];
  category: string;

}

declare module '@packy-tang/vue-tinymce' {
  
}