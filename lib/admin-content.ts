import { getFriendsContent, getHomeContent, getNavigationItems, getPhotoAlbums, getPhotos, getProjectsContent, getSiteProfile, getSocialItems } from "@/lib/content"

export interface AdminSection {
  href: string
  label: string
  eyebrow: string
  description: string
}

export interface AdminStat {
  label: string
  value: string
  description: string
}

export interface AdminChecklistItem {
  label: string
  description: string
  done: boolean
}

export function getAdminSections(): AdminSection[] {
  return [
    { href: "/admin/profile", label: "站点资料", eyebrow: "SITE PROFILE", description: "作者资料、技能组、经历与联系信息" },
    { href: "/admin/home", label: "首页内容", eyebrow: "HOME", description: "Hero、Now 卡片、快捷入口与照片条带" },
    { href: "/admin/navigation", label: "导航与社媒", eyebrow: "NAVIGATION", description: "导航菜单与社媒外链配置" },
    { href: "/admin/friends", label: "友链", eyebrow: "FRIENDS", description: "友链页文案与友链列表" },
    { href: "/admin/projects", label: "项目", eyebrow: "PROJECTS", description: "项目页头部与项目卡片数据" },
    { href: "/admin/albums", label: "相册", eyebrow: "ALBUMS", description: "相册实体、名称与描述" },
    { href: "/admin/photos", label: "照片", eyebrow: "PHOTOS", description: "照片元数据、标签、排序与精选状态" },
    { href: "/admin/posts", label: "文章", eyebrow: "POSTS", description: "文章维护入口与后续扩展位" },
  ]
}

export function getAdminStats(): AdminStat[] {
  const profile = getSiteProfile()
  const home = getHomeContent()
  const projects = getProjectsContent()
  const photos = getPhotos()
  const albums = getPhotoAlbums()
  const friends = getFriendsContent()
  const navigation = getNavigationItems()
  const social = getSocialItems()

  return [
    { label: "站点标题", value: profile.siteTitle, description: "作者资料和基础站点身份已进入内容层" },
    { label: "首页区块", value: `${home.quickLinks.length + 4}`, description: "当前首页已拆出 Hero、卡片、快捷入口等内容块" },
    { label: "项目卡片", value: String(projects.items.length), description: "项目页内容已从页面常量迁入结构化配置" },
    { label: "照片 / 相册", value: `${photos.length} / ${albums.length}`, description: `当前已抽离 ${photos.length} 条照片元数据与 ${albums.length} 个相册` },
    { label: "友链", value: String(friends.items.length), description: "友链内容与页面文案已独立维护" },
    { label: "导航 / 社媒", value: `${navigation.length} / ${social.length}`, description: "导航与社媒已脱离页面 hardcode" },
  ]
}

export function getAdminChecklist(): AdminChecklistItem[] {
  return [
    { label: "内容层抽离", description: "站点资料、首页、友链、项目、照片已经进入内容层。", done: true },
    { label: "后台骨架", description: "后台 layout、侧栏、dashboard 和内容域路由已经具备。", done: true },
    { label: "后台读写层", description: "下一步补 lib/admin-content.ts 的真实读写与校验能力。", done: false },
    { label: "区块级保存", description: "后续每个内容域要按独立区块接保存，而不是全页大表单。", done: false },
    { label: "照片页复杂交互", description: "照片页后续补筛选、列表编辑、详情侧栏和局部更新。", done: false },
  ]
}

export function getAdminRecentChanges(): string[] {
  return [
    "后台已经有完整页面树和组件骨架，后续可以按内容域逐页接入，不需要再重做 layout。",
    "当前最值得先接的是真实读写边界：统一在 lib/admin-content.ts 和 server actions 里处理。",
    "Profile 和 Home 建议优先落地，因为它们最适合验证区块级保存和独立组件模式。",
  ]
}
