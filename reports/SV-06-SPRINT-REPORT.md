# SV-06 SpiritVale Homepage Development — Sprint Report

## 1. 完成内容

- 建立正式首页入口：/。
- 保留并接入 /playground/，其组件展示不再作为生产首页。
- 建立全站 Header、移动端菜单、Theme Switch、Footer、Skip Link 与统一的安全规划路由壳。
- 完成固定顺序首页模块：Hero、Quick Search、Start Here、Explore Classes、Game Database、Featured Guides、Explore SpiritVale、Latest Updates、Footer。
- 建立 Asset Resolver、AssetImage、Class/Guide/Source 数据读取与数据库栏目配置。
- 接入 SV-03 官方 WebP 素材、SV-04 Class/Guide/Source JSON，以及 SV-05 Token 和组件库。
- 新增首页 SEO metadata、Open Graph、Twitter Card 和 WebSite JSON-LD。
- 为 Button、ClassCard、GuideCard、DatabaseCard、FeatureSection 添加并文档化所需 variants；Playground 已补充 variants 示例。
- 增加首页自动验证脚本，并保持 SV-03、SV-04 既有验证通过。
- 未部署网站；未创建额外验收报告。

## 2. 文件变更

### 新增

- src/app/App.tsx
- src/app/Header.tsx
- src/app/Footer.tsx
- src/app/HomePage.tsx
- src/app/site.ts
- src/app/site.css
- src/main.tsx
- src/data/types.ts
- src/data/assets.ts
- src/data/AssetImage.tsx
- src/data/content.ts
- src/data/index.ts
- scripts/validate-spiritvale-homepage.mjs
- reports/SV-06-SPRINT-REPORT.md

### 修改

- index.html
- package.json
- tsconfig.app.json
- src/design-system/components/base.tsx
- src/design-system/components/layout.tsx
- src/design-system/components/spiritvale.tsx
- src/design-system/styles/design-system.css
- src/design-system/utils/theme.ts
- playground/App.tsx
- docs/design-system/README.md
- docs/design-system/COMPONENTS.md

### 删除

- 无。

## 3. 首页模块

| 模块 | 实现结果 |
| --- | --- |
| Header | 官方 Logo、Home、Guides、Classes、Builds、Database、Bosses、Search、Theme Switch、移动菜单；当前页有 aria-current。 |
| Hero | 使用 HeroBanner、官方 sv-home-hero、单一 H1、overlay、Classes 与 Guides CTA。 |
| Quick Search | 使用 SearchBar；点击 Search 或按 Enter 会安全跳转至 /search/?q=关键词。 |
| Start Here | 从 SV-04 读取四个非 Card System Guide，使用真实图片和 GuideCard。 |
| Classes | 从 SV-04 读取 7 个 Base Class；仅显示名称、Base Class 和诚实的 Guide coming soon。 |
| Database | 7 个栏目入口，均标记 Coming soon 且指向安全的规划路径。 |
| Guides | 从 SV-04 读取 5 个 Guide，使用已登记图片和简洁站点编辑文案。 |
| Explore SpiritVale | 使用已登记 gameplay、maps、bosses、hero 官方图片，标题均为描述性栏目标题。 |
| Latest Updates | 使用 EmptyState，包含读取自 Source 数据的 Official Steam 外链。 |
| Footer | Explore、Database、Resources、Legal 分区，官方 Steam 外链和非官方免责声明完整。 |

## 4. 数据接入

- 读取 data/spiritvale/classes/classes.json：首页展示 7 个 Base Class。
- 读取 data/spiritvale/guides/guides.json：首页展示 5 个 Guide，Start Here 从同一数据集中筛选 4 个。
- 读取 data/spiritvale/sources/sources.json：读取 2 个官方 Source，并使用官方 Steam Source 作为 Updates CTA 与 Footer 外链。
- 首页没有硬编码七职业数组；职业名称、顺序、slug 与 Class 类型均来自 SV-04。
- 数据库栏目是允许的站点导航配置，不宣称实体记录、数值或数量。
- Class 或 Guide 数据为空时，页面渲染明确的 EmptyState，不会生成推测性内容。

## 5. 素材接入

- Asset Resolver：src/data/assets.ts 的 resolveSpiritValeAsset(imageAssetId)。
- 图片渲染：src/data/AssetImage.tsx。它只消费 Resolver 返回的 src、alt、width、height；ID 缺失时返回 Official image unavailable 安全状态，并在开发环境输出明确错误。
- 首页使用 16 个唯一 imageAssetId，自动检查成功解析 16 个，缺失 0 个。
- 图片包含官方品牌 Logo、首页 Hero、10 个已登记 Guide 图片，以及 gameplay / maps / bosses / hero 世界展示图片。
- 源码扫描未发现直接 /images/ 图片路径，也未使用外部图片 URL 或竞争站图片。
- Hero 为 eager/high-priority；其余图片 lazy loading，并由清单宽高降低 CLS 风险。

## 6. Design System 使用

使用的 SV-05 组件包括：

- DesignSystemProvider
- IconButton、Button、Badge、EmptyState
- Container、Section、Grid、PageHeader
- HeroBanner、SearchBar、ClassCard、GuideCard、DatabaseCard、FeatureSection

新增且复用原组件的 variants：

- Button：outline
- ClassCard：compact
- GuideCard：featured
- DatabaseCard：compact
- FeatureSection：highlighted

未创建 HomepageClassCard 等重复组件。业务代码没有硬编码 hex、rgb、hsl 或空间 Token；首页样式使用既有 CSS custom properties 与 Tokens。

## 7. 响应式结果

| 尺寸 | 实测结果 |
| --- | --- |
| 375 × 812 | scrollWidth = 375，无水平滚动；Primary Nav 隐藏，Mobile Menu 可见；菜单可打开，Esc 可关闭。 |
| 768 × 1024 | scrollWidth = 768；首个卡片网格为两列（323px 323px）；Header 收缩正常。 |
| 1440 × 900 | scrollWidth = 1440；Desktop Nav 可见；H1 数量 1；15 个当前渲染图片中已加载图片损坏数 0；Theme Switch 成功切换至 light。 |

附加检查：

- 320px：scrollWidth = 320，无水平滚动。
- 1024px：三列网格，无水平滚动。
- 1280px：三列网格，无水平滚动。

## 8. SEO

- Title：SpiritVale Wiki, Builds, Classes and Game Database
- Description：Explore SpiritVale classes, guides, builds, skills, equipment, cards, monsters, bosses and essential game resources.
- Canonical：首页运行时为 http://127.0.0.1:5173/，路径为 /。
- Open Graph：title、description、type=website、真实官方 Hero image、image alt 均存在。
- Twitter Card：summary_large_image，并使用真实 Hero image。
- JSON-LD：有效的 WebSite JSON，包含 @context、@type、name、url、description；未加入不真实的 SearchAction 或官方 publisher 宣称。
- H1 数量：1。

## 9. Accessibility

- 使用语义化 header、nav、main、section、footer。
- 首页仅一个 H1，后续标题按 H2/H3 层级排列。
- Skip to content 链接可用。
- 所有官方游戏图片的 alt 来自 SV-03 素材清单。
- 组件 focus-visible 使用 SV-05 focus Token。
- Theme Switch 有明确 aria-label。
- Mobile Menu 可键盘打开；打开后首个链接获得焦点；Esc 关闭后焦点回到菜单按钮。
- 搜索框具备 aria-label，Enter 与按钮提交均验证可用。
- 颜色使用 SV-05 Dark/Light semantic Token；prefers-reduced-motion 禁用动画与过渡。

## 10. 验证命令与结果

    npm test

结果：

    SpiritVale homepage validation PASSED
    Base classes from SV-04: 7
    Guides from SV-04: 5
    Sources from SV-04: 2
    Resolved homepage asset IDs: 16
    Missing homepage asset IDs: 0
    Homepage H1 count: 1 (HeroBanner)
    Metadata and WebSite JSON-LD: present

    npm run typecheck

结果：

    tsc -b --pretty false

通过，无 TypeScript 错误。

    npm run lint

结果：

    eslint .

通过，无 ESLint 错误或警告。

    npm run build

结果：

    vite v7.3.6 building client environment for production...
    ✓ 68 modules transformed.
    dist-playground/assets/index-DTrZeigZ.css   12.76 kB │ gzip:  2.54 kB
    dist-playground/assets/index-CuZwHl5u.js   247.61 kB │ gzip: 72.56 kB
    ✓ built in 338ms

    node scripts/validate-spiritvale-assets.mjs

结果：

    SpiritVale asset validation PASSED
    Manifest assets: 26
    Unique raw sources: 26
    All image files checked: 52
    Source counts: {"official-press-kit":18,"official-steam":8}

    node scripts/validate-spiritvale-data.mjs

结果：

    SpiritVale data validation PASSED
    Schema files: 13
    Data files: 26
    Formal records: 20
    Duplicate IDs: 0
    Duplicate slugs: 0
    Invalid image asset IDs: 0
    Invalid source IDs: 0

## 11. 浏览器验收

- 页面：/、/playground/、/classes/、/search/?q=Mage 与 /search/?q=Rogue。
- /playground/ 正常渲染组件预览。
- /classes/ 正常渲染安全 Coming Soon 页面壳，不产生未处理 404。
- 搜索按钮和 Enter 均进入安全的 Search Coming Soon 页面壳。
- Mobile Menu 通过点击打开并通过 Esc 关闭。
- Theme Switch 在桌面测试中成功切换。
- 控制台错误：0。
- 可见已加载图片损坏数：0；SV-03 验证确认全部 52 个清单图片文件可读取。
- 在 320、375、768、1024、1280、1440 宽度均未观察到水平滚动。

## 12. Lighthouse

未运行。当前项目没有安装 Lighthouse CLI，浏览器验收环境也未提供 Lighthouse 审计能力；为避免引入未请求的大型审计依赖，未安装额外工具，未伪造评分。

## 13. 禁止项检查

| 检查项 | 结果 |
| --- | --- |
| 是否虚构游戏数据 | 否。Class、Guide、Source 仅使用 SV-04 记录；空实体栏目明确标记 Coming soon。 |
| 是否复制竞争站内容 | 否。 |
| 是否使用 AI 游戏图 | 否。仅使用 SV-03 已登记官方素材。 |
| 是否直接写图片路径 | 否。页面通过 imageAssetId 和 Asset Resolver 使用图片。 |
| 是否硬编码七职业 | 否。职业数组来自 SV-04 Loader。 |
| 是否修改 SV-03 | 否。 |
| 是否修改 SV-04 Schema 或数据 | 否。 |
| 是否部署网站 | 否，遵循 Sprint 禁止项。 |
| 是否生成文章 | 否。 |
| 是否生成第二份 SV-06 验收报告 | 否。 |

## 14. 已知限制

- Guide、Class、Build、Database 详情页尚未开发；首页所有相关入口统一进入明确的安全规划页面壳。
- 搜索目前只实现安全跳转，不执行全文检索或返回数据结果。
- 数据库实体集合尚为空，因此不显示任何数据库数量、技能数值、装备、Boss、怪物或地图实体事实。
- 站点未部署，Canonical 和 OG image 在本地验收时使用本地 origin；部署时应由正式域名承载同一逻辑。
- Lighthouse 评分未执行，原因见第 12 节。

## 15. 下一步建议

1. 在保持 Source 与 Asset Resolver 约束的前提下，优先开发 Guide 详情页壳和真实验证内容。
2. 当 SV-04 数据中出现经验证的 Class、Database 实体与关系后，再替换对应的 Coming soon 状态。
3. 部署前为正式域名执行 Lighthouse 与生产环境资源/Canonical 验收。
