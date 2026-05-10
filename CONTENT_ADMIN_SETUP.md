# 内容后台接入说明

## 这次已经接好的部分

项目里已经补好了一个轻量 CMS 入口脚手架：

- 后台入口：`/admin`
- 页面文件：`public/admin/index.html`
- 配置文件：`public/admin/config.yml`

它已经把这些内容文件映射成可视化表单：

- `content/site/profile.json`
- `content/site/home.json`
- `content/site/social-links.json`
- `content/site/navigation.json`
- `content/site/friends.json`
- `content/site/projects.json`
- `content/photos/albums.json`
- `content/photos/photos.json`

## 你现在能获得什么

这意味着后续这些内容不应该再通过改页面代码来维护：

- 社媒链接
- 导航
- 头像和个人资料
- 首页文案
- Now 卡片
- 友情链接
- 项目卡片
- 照片元数据、相册、标签、排序

## 启用前还需要你补的 1 个关键配置

打开：

- `public/admin/config.yml`

把这里改成你自己的仓库：

```yml
backend:
  name: github
  repo: your-github-name/your-blog-repo
  branch: main
```

例如：

```yml
backend:
  name: github
  repo: Ljj-user/ZhBlog
  branch: main
```

## 本地调试

当前配置里已经开启了：

```yml
local_backend: true
```

这表示你后续可以配合 Decap 的本地代理来本地调试后台。

如果只是先看后台页面结构，直接启动项目后访问：

- `http://localhost:3000/admin`

## 生产环境说明

这个后台脚手架解决的是“内容入口和表单映射”问题。

真正在线上稳定可用，还需要你补齐认证方式。常见有两种：

1. GitHub Backend
2. Netlify Identity + Git Gateway

如果你继续部署在 Vercel，通常更适合：

1. 继续用 GitHub Backend
2. 或者后面升级成真正的自建后台 / Supabase Admin

## 当前限制

这套脚手架现在更适合管理“结构化内容”和“图片 URL”，还不适合直接管理大量原始照片文件。

也就是说：

- 照片原图仍建议放对象存储
- `photos.json` 里保存图片 URL、标题、标签、相册、排序等元数据

## 推荐使用方式

现阶段建议这样分工：

1. 文章继续走 `MDX`
2. 站点资料、社媒、项目、友链走 CMS + JSON
3. 照片原图走对象存储
4. 照片标签/相册/说明走 `photos.json`

## 下一步最值得做的事

如果继续往下推进，最值的是二选一：

1. 我帮你把 `config.yml` 进一步改成适配你真实仓库的版本
2. 我继续补“照片上传到对象存储 + 自动写入元数据”的流程设计
