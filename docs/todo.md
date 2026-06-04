# ZH_Blog Refactor Todo

本文档用于跟踪 `ZH_Blog` 的阶段性重构任务状态。

执行规则：

* 只有在用户明确要求时，才执行对应任务。
* 每次只完成一个 Priority Block。
* 完成后同步更新状态。
* 不自动继续下一个任务。

状态说明：

* `[ ]` 未开始
* `[~]` 进行中
* `[x]` 已完成
* `[!]` 阻塞或需要用户确认
---
# P11 生成两份

---

# P1 - Global Design System / 全局视觉规范

## Goal

统一全站卡片、边框、圆角、动效与暗色模式视觉语言。

## Acceptance Criteria

* [x] 首页、文章、归档、项目、照片、友链、关于页的基础视觉语言统一
* [x] 没有大面积重写页面结构
* [x] `npm run lint` 通过
* [x] `npm run build` 通过

---

# P2 - Home First Screen / 首页首屏与侧栏优化

## Goal

优化首页第一屏的文案、状态感、社交信息和图片网格。

## Acceptance Criteria

* [x] 首页 CTA 文案已中文化
* [x] `ONLINE` 有呼吸灯效果
* [x] `Now` 看板有更新时间
* [x] 社交链接已更新
* [x] 首屏图片网格比例稳定
* [x] `npm run lint` 通过
* [x] `npm run build` 通过

---

# P3 - Home Polaroid UX / 首页拍立得横向相册交互

## Goal

让首页拍立得横向浏览更自然，PC 用户可直接通过滚轮浏览。

## Acceptance Criteria

* [x] 鼠标滚轮可驱动相册横向滚动
* [x] 右侧有自然渐变提示
* [x] 移动端触摸滑动不受影响
* [x] `npm run lint` 通过
* [x] `npm run build` 通过

---

# P4 - Posts System / 文章系统增强

## Goal

增强文章发现能力与内容层次。

## Acceptance Criteria

* [x] `/posts` 可搜索文章
* [x] `/posts` 可按 tag/category 过滤
* [x] 文章卡片展示 AI 导读句
* [x] 文章详情页有上一篇 / 下一篇
* [x] 文章详情页有相关文章推荐
* [x] 原有文章渲染逻辑未被破坏
* [x] `npm run lint` 通过
* [x] `npm run build` 通过

---

# P5 - Archive Timeline / 归档页时间轴重构

## Goal

把 `/archive` 从普通列表改为安静的纵向时间轴。

## Acceptance Criteria

* [x] `/archive` 为时间轴布局
* [x] 年份 / 月份层级清晰
* [x] 标题可点击跳转
* [x] 移动端排版正常
* [x] `npm run lint` 通过
* [x] `npm run build` 通过

---

# P6 - Projects Portfolio / 项目页作品集升级

## Goal

把 `/projects` 从 GitHub 仓库索引升级为更像个人作品集的页面。

## Acceptance Criteria

* [x] `/projects` 使用 bento grid
* [x] 大项目和小项目有视觉层级
* [x] 项目数据包含 `pain / result / lesson`
* [x] 至少部分项目包含 AI 共创度或开发氛围描述
* [x] 不破坏现有项目链接
* [x] `npm run lint` 通过
* [x] `npm run build` 通过

---

# P7 - Photos Polaroid / 拍立得相册页细节打磨

## Goal

让 `/photos` 更像真实拍立得相册，强化胶片复古生活流。

## Acceptance Criteria

* [x] `/photos` 卡片更有纸张感
* [x] 底部文字有手写感
* [x] 点击照片可打开 Lightbox
* [x] Lightbox 不影响移动端体验
* [x] 不伪造 EXIF
* [x] `npm run lint` 通过
* [x] `npm run build` 通过

---

# P8 - Friends Shuffle / 友链页趣味化

## Goal

让 `/friends` 不再是普通头像列表，而更像独立博客之间的随机串门入口。

## Acceptance Criteria

* [x] `/friends` 卡片视觉不再是普通头像列表
* [x] Shuffle 按钮可随机打开友链
* [x] 无效链接不会报错
* [x] 移动端排版正常
* [x] `npm run lint` 通过
* [x] `npm run build` 通过

---

# P9 - About Page / 关于页视觉锚点

## Goal

让 `/about` 更像一个人的自述，而不是简历页。

## Acceptance Criteria

* [x] `/about` 有左图右文布局
* [x] 有轻量时空足迹组件
* [x] 移动端排版正常
* [x] 未引入重型地图依赖
* [x] `npm run lint` 通过
* [x] `npm run build` 通过

---

# P10 - Final Review / 全站回归检查

## Goal

在所有页面重构完成后，做一次全站一致性、可访问性和构建检查。

## Acceptance Criteria

* [x] 主要页面 `/` `/posts` `/archive` `/projects` `/photos` `/friends` `/about` 可正常访问
* [x] 全站卡片、边框、暗色模式与入场动效保持一致
* [x] 社交链接已统一更新
* [x] 移动端布局未发现明显崩坏
* [x] 新数据字段具备 fallback
* [x] 未发现明显 `console` 调试残留
* [x] 未发现阻塞性的未使用依赖或重复代码问题
* [x] `npm run lint` 通过
* [x] `npm run build` 通过
* [x] `docs/todo.md` 状态已更新准确
