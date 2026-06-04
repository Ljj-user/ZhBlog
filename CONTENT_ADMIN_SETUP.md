# 内容后台说明

项目现在只保留一套内建后台：

- 入口：`/admin`
- 用途：本地编辑 `content/` 下的 JSON 和 MDX 内容
- 默认策略：本地开发可用，生产环境默认关闭

当前可直接维护的内容：

- `content/site/profile.json`
- `content/site/home.json`
- `content/site/social-links.json`
- `content/site/navigation.json`
- `content/site/friends.json`
- `content/site/projects.json`
- `content/photos/albums.json`
- `content/photos/photos.json`
- `content/posts/*.mdx`

这次清理后，旧的 Decap CMS 配置已经移除，不再维护第二套后台入口。

推荐使用方式：

1. 文章继续写在 `content/posts/*.mdx`
2. 站点资料、导航、项目、友链、相册元数据继续放在 `content/`
3. 通过 `/admin` 做日常小修改
4. 图片资源尽量使用稳定地址，关键图优先放自有静态资源或可靠 CDN

这套方案的目标不是“复杂 CMS”，而是让个人 Blog 长期更新时保持简单、直观、好维护。
