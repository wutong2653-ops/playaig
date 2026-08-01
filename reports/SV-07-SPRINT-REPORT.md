# SV-07 SpiritVale Guide System & 5 Launch Guides — Sprint Report

## 1. 完成内容

- 建立了 `/guides/` 索引页，以及五个可直接访问的 Guide 路由：
  - `/guides/beginner-guide/`
  - `/guides/class-guide/`
  - `/guides/leveling-guide/`
  - `/guides/stats-guide/`
  - `/guides/card-system-guide/`
- 五篇 Guide 均使用同一套数据驱动详情模板，包含 Breadcrumb、分类、验证状态、最后审核日期、Hero 图片、简介、目录、正文区块、来源、FAQ、相关推荐与免责声明。
- 五篇 Guide 记录均已扩展为正式数据：每篇至少 4 个内容章节、2 个已登记 SV-03 素材、3 条 FAQ、3 篇相关推荐和可追溯的来源 ID。
- 新增 Guide Index：Featured Guide、所有 Guide 卡片、现有 taxonomy 分类和验证提示均由数据读取。
- 新增安全兜底页：`/guides/unknown-guide/` 显示 `Guide not found`，不渲染虚构内容。
- Guide 的事实性内容仅引用已登记的第一方 `SpiritVale Official Steam Store` 来源；未确认的职业职责、武器、数值、升级路线、卡牌效果和 Build 建议均明确省略。
- 新增 Article、BreadcrumbList 与 FAQPage JSON-LD；每个 Guide 路由均有独立 title、description、canonical、Open Graph/Twitter metadata，并在构建中输出对应静态 HTML metadata。
- 新增/扩展数据验证：章节、FAQ、关系、来源、图片资产、canonical、状态和禁止的未验证占位内容均受检查。
- 扩展组件文档与 Playground，加入 Guide 组件与验证状态示例。
- 修复了客户端路由父组件覆盖 Guide metadata 的问题；现在 SPA 导航和静态产物均使用 Guide 的专属 metadata。

## 2. 文件变更

### 数据与 schema

- `schemas/spiritvale/guide.schema.json`
- `data/spiritvale/guides/guides.json`
- `data/spiritvale/sources/sources.json`
- `src/data/types.ts`
- `src/data/content.ts`
- `scripts/validate-spiritvale-data.mjs`

### Guide 页面、组件与样式

- `src/app/App.tsx`
- `src/app/GuidesIndexPage.tsx`
- `src/app/GuideDetailPage.tsx`
- `src/app/site.ts`
- `src/app/site.css`
- `src/components/guides/index.tsx`
- `src/components/index.ts`
- `src/design-system/components/spiritvale.tsx`

### 构建、验证与文档

- `scripts/prerender-spiritvale-guides.mjs`
- `scripts/validate-spiritvale-guides.mjs`
- `package.json`
- `docs/design-system/COMPONENTS.md`
- `playground/App.tsx`
- `reports/SV-07-SPRINT-REPORT.md`

## 3. Guide 与内容统计

| 项目 | 数量 |
| --- | ---: |
| 上线 Guide | 5 |
| Guide canonical 路径 | 5 |
| 内容章节 | 21 |
| FAQ | 15 |
| 每篇正文图片 | 2 |
| 已解析的 Guide 图片引用 | 20 |
| 缺失图片引用 | 0 |
| 每篇相关推荐 | 3 |

五篇 Guide 均标记为 `published`，事实审核状态为 `partially-verified`；每条可核实事实均关联已登记来源。

## 4. 来源与素材使用

- Guide 事实来源：`SpiritVale Official Steam Store`（第一方 Steam 官方商店页；source owner：Baikun Interactive）。
- 复用 SV-03 已登记的官方图片资产；组件只接收 `imageAssetId`，没有写入裸图片路径或外部图片 URL。
- 未新增来源不明、Steam Community、YouTube 缩略图、竞争站点图片或 AI 生成游戏截图。

## 5. SEO 与静态输出

- 每篇 Guide 包含唯一 title、description、canonical、`og:*` 与 Twitter 图片 metadata。
- 每篇 Guide 输出 `Article`、`BreadcrumbList`、`FAQPage` JSON-LD；Guide Index 输出 `CollectionPage` 与 `BreadcrumbList`。
- `npm run build` 生成 5 个 Guide 静态路由 metadata HTML：`dist-playground/guides/<slug>/index.html`。

## 6. 响应式与交互验收

本地浏览器在 375px、768px、1440px 宽度完成验收：

- 375px：无横向溢出；移动端目录可展开；FAQ 可展开；移动导航可打开并通过 Escape 关闭。
- 768px：Guide Index 显示 Featured Guide、全部 5 篇 Guide 与 taxonomy 分类；无横向溢出。
- 1440px：详情页显示桌面侧栏目录、来源、3 篇相关推荐；无横向溢出、无损坏图片。
- 主题切换：Dark Mode 默认，桌面主题按钮可切换至 Light Mode。
- 五条 Guide 路由均验证：1 个 H1、至少 2 张不同 Guide 内容图片、3 条 FAQ、3 篇相关推荐、专属 metadata，且无损坏图片。
- `/guides/unknown-guide/` 已验证为安全 Not Found 页面；`/` 与 `/playground/` 仍可访问。
- 浏览器控制台错误：0。

## 7. TypeScript 检查结果

命令：

```bash
npm run typecheck
```

结果：通过（`tsc -b --pretty false`，退出码 0）。

## 8. ESLint 检查结果

命令：

```bash
npm run lint
```

结果：通过（`eslint .`，退出码 0）。

## 9. 构建与验证结果

执行命令：

```bash
npm run build
npm test
npm run typecheck
npm run lint
node scripts/validate-spiritvale-assets.mjs
node scripts/validate-spiritvale-data.mjs
node scripts/validate-spiritvale-homepage.mjs
node scripts/validate-spiritvale-guides.mjs
```

结果：全部通过，退出码 0。

- 生产构建：80 个模块转换完成；Guide 静态 metadata 输出通过；静态 Guide 路由文件 5 个。
- Guide 验证：5 篇 Launch Guide、5 条 canonical、20 个图片引用全部解析、0 个缺失引用；共享模板、JSON-LD、TOC、FAQ、相关推荐和 Not Found 均存在。
- 数据验证：13 个 schema、26 个数据文件、20 条正式记录；重复 ID/slug、无效引用、无效资产 ID、无效来源 ID 均为 0。
- 素材验证：26 个 manifest 素材、26 个唯一 raw source、52 个图片文件全部可读取。

## 10. Playground 运行结果

`/playground/` 可运行并保留 Design System 预览；已加入 `VerificationBadge` 示例。浏览器验收中该路由可访问，页面主标题为 `SpiritVale Design System`。

## 11. 已知限制

- 当前可用的第一方文字事实主要来自官方 Steam 商店页，因此所有 Guide 保持 `partially-verified`，并刻意不提供未获第一方确认的职业定位、武器、属性公式、升级效率路线、卡牌/神器效果或具体 Build。
- 现有五篇 Guide 均使用 SV-03 的已登记官方素材；没有为缺少明确游戏内说明的系统补造截图。
- 本 Sprint 按要求未部署站点。
- 未安装 Lighthouse；已以构建、静态 metadata、数据/素材/Guide 验证和 375/768/1440 本地浏览器验收代替其运行。

## 12. 下一步建议

1. 在取得官方新闻、Press Kit 更新或用户自采并获确认的截图后，补充来源记录并将对应 Guide 升级为更高验证状态。
2. 收到第一方职业、属性、升级、卡牌和神器细节后，再扩展对应 schema 内容与 Guide 章节；不要以推测补齐。
3. SV-08 及后续业务页面应直接复用本 Sprint 的 Guide 模板、验证徽章、来源标记、结构化数据与静态 metadata 构建流程。
