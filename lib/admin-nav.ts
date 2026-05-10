export interface AdminNavItem {
  href: string
  label: string
  description: string
}

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "概览", description: "后台总览与内容入口" },
  { href: "/admin/profile", label: "站点资料", description: "作者资料与联系方式" },
  { href: "/admin/home", label: "首页内容", description: "Hero、卡片与首页区块" },
  { href: "/admin/navigation", label: "导航社媒", description: "导航菜单与社媒链接" },
  { href: "/admin/friends", label: "友链", description: "友链页文案与友链列表" },
  { href: "/admin/projects", label: "项目", description: "项目页文案与项目卡片" },
  { href: "/admin/albums", label: "相册", description: "相册实体与分类信息" },
  { href: "/admin/photos", label: "照片", description: "照片元数据、标签与排序" },
  { href: "/admin/posts", label: "文章", description: "文章维护入口与说明" },
]

export function isAdminNavActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function getCurrentAdminNavItem(pathname: string) {
  return adminNavItems.find((item) => isAdminNavActive(pathname, item.href)) ?? adminNavItems[0]
}
