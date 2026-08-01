# SV-10 SpiritVale Search System & SEO Foundation — Sprint Report

## 1. 完成内容

- 完成统一 Search Service、派生式 Search Index、`/search/`、筛选链接、结果卡片和真实空状态。
- Header 在首页、Guides、Classes、Database 等所有共享 Header 路由复用同一 `SearchBar`；未建立第二套搜索实现。
- 完成通用 Metadata Generator、Canonical、Open Graph、Twitter Card 与全站 JSON-LD 注入整理。
- 完成通用 404 页面（搜索、Browse Guides、Browse Classes、Back Home）。
- 构建时生成 `sitemap.xml`、`robots.txt`、`rss.xml`、`opensearch.xml`，并为所有发布路由生成静态 metadata 输出。
- 新增 Search / Technical SEO 自动验证，全部既有与新增验证通过。

## 2. 文件变更

- `src/data/types.ts`：Search Record、分类与验证状态类型。
- `src/data/search.ts`、`src/data/index.ts`：由正式 Guides、Classes、Database Categories 派生的 Search Index 和查询服务。
- `src/components/search/index.tsx`、`src/components/index.ts`：统一 `SearchResultCard`。
- `src/app/SearchPage.tsx`、`src/app/NotFoundPage.tsx`、`src/app/App.tsx`、`src/app/Header.tsx`、`src/app/site.ts`、`src/app/HomePage.tsx`、`src/app/site.css`：搜索 UI、404、共享 Header、统一 metadata、Canonical 与样式。
- `scripts/generate-spiritvale-seo.mjs`：Discovery 文件与静态首页 metadata 生成。
- `scripts/validate-spiritvale-search.mjs`、`scripts/validate-spiritvale-homepage.mjs`：Search / SEO 验证与新版 Not Found 路由断言。
- `package.json`：build 串接 SEO 生成；test 串接 Search 验证。
- `public/sitemap.xml`、`public/robots.txt`、`public/rss.xml`、`public/opensearch.xml`：当前构建生成的发布发现文件。

## 3. Search System

- 路由：`/search/?q=`；支持 `all`、`guides`、`classes`、`database` 分类筛选。
- 查询为大小写无关的多关键词 AND 匹配，不对空查询制造结果。
- `mage` 的实际结果为 **Mage Class** 与 **SpiritVale Class Guide**；不会因通用导航关系而把无关 Guide 或其他职业误命中。
- `SearchResultCard` 展示 Title、Category、Summary、Verification Badge、URL 与 Source Type。
- 空结果固定显示：`No verified results found.` 与引导至已验证 Guides / Classes 的文案。

## 4. Search Index

| 来源 | 索引数量 | 读取方式 |
| --- | ---: | --- |
| Guides | 5 | `getGuides()` |
| Classes | 7 | `getClasses()` |
| Database Categories | 7 | `getDatabaseCategories()` |
| 合计 | 19 | 由 SV-04 正式数据实时派生 |

未创建搜索专用业务数据、副本或假条目。尚为空的数据库分类仍以真实的 `Data Collection In Progress` 状态索引。

## 5. Search UI

- `/search/` 使用现有 Design System 的 `SearchBar`、`Badge`、`EmptyState`、`SearchResultItem`。
- 共享 Header 的桌面与移动导航都使用同一 `SearchBar` 组件与同一提交逻辑。
- 搜索结果与空状态均提供清晰可聚焦链接；保留 Skip Link 和现有 focus 样式。

## 6. Sitemap

- 构建输出 `public/sitemap.xml`，共 23 个唯一 URL。
- 包含首页、Guides Index、Classes Index、Database Index、5 篇 Guide、7 个 Class、7 个 Database Category。
- 不包含 Search、404、Playground 或未知路由。
- 绝对 URL 由 `SPIRITVALE_SITE_URL` 生成；当前未配置生产域名时使用保留示例域 `https://spiritvale.example`，不代表已上线域名。

## 7. robots

- 构建输出 `public/robots.txt`。
- 允许公开首页、Guides、Classes、Database。
- 禁止 `/playground/`、`/search/`、`/404/`、`/src/`、`/node_modules/`，并声明 Sitemap 地址。

## 8. RSS

- 构建输出 `public/rss.xml`，包含全部 5 篇已发布 Guide。
- RSS 按已有 `updatedAt` 倒序，`lastBuildDate` 取正式 Guide 数据中最新日期。
- 未生成虚构的发布日期、更新日期或 Database 内容。

## 9. OpenSearch

- 构建输出 `public/opensearch.xml`。
- 提供以 `/search/?q={searchTerms}` 为模板的浏览器 Search Provider。

## 10. SEO

- `applyPageMetadata` 统一生成 Title、Description、Canonical、OG、Twitter Card、robots 和 JSON-LD。
- Search 与 404 使用 `noindex,follow`；发布内容页默认 `index,follow`。
- 静态检查覆盖 23 个发布路由，确认每页仅一个 Canonical 和非空 Description。
- 新增验证覆盖 H1、Alt、Breadcrumb、Internal Links、Robots、Sitemap、OG、Twitter、JSON-LD 和禁止图片路径规则。

## 11. JSON-LD

- Homepage：`WebSite`。
- Guides Index / Classes Index / Database Index：`CollectionPage` 与 `BreadcrumbList`。
- Guide Detail：现有 `Article`、`BreadcrumbList` 与仅基于正式 Guide 数据的 FAQ。
- Class Detail：`Article` 与 `BreadcrumbList`。
- Database Category：`CollectionPage` 与 `BreadcrumbList`。
- Search、404：不输出不适用的 JSON-LD。

## 12. Lighthouse

- 未执行，也未报告虚构评分。
- 原因：当前项目依赖与系统 PATH 均不存在 Lighthouse CLI（`npm ls lighthouse --depth=0` 返回空）；本 Sprint 未安装额外依赖。

## 13. Responsive

浏览器实际检查 375、768、1024、1440 宽度：

- 375：`/search/?q=mage` 结果、metadata 与无横向滚动通过。
- 768：搜索空状态与 `/404` CTA、无横向滚动通过。
- 1024：Class 筛选和 Header Search、无横向滚动通过。
- 1440：首页、Guide、Class、Database Category 的唯一 H1、Canonical、Description、JSON-LD（适用页面）与无横向滚动通过。

## 14. Accessibility

- Search、404 和既有发布页面均保留唯一主 H1、Skip Link、可聚焦链接 / 表单控件和可见 focus 体系。
- 搜索框具备 SearchBox 语义；筛选项是键盘可达链接。
- 所用图片继续通过既有 Asset Resolver 提供已登记的 alt；未加入外链或无 alt 图片。
- 浏览器检查到 54 个 Guide 页键盘可达交互元素、1 个搜索输入和有效 Skip Link。

## 15. Build

`npm run build` 通过：

- Vite 转换 97 modules，构建耗时约 393 ms。
- 5 个 Guide、7 个 Class、7 个 Database Category 静态 metadata 输出通过。
- SEO Discovery 文件生成通过（Sitemap 23 URLs、RSS 5 items）。

## 16. 浏览器验收

- 本地 Vite（`http://127.0.0.1:5173`）验收通过；验收后已关闭浏览器标签和开发服务器。
- `mage` 搜索结果为 `SpiritVale Class Guide`、`Mage Class`；分类筛选 `type=classes` 时仅返回 `Mage Class`。
- Search 无结果提示、404 的 Search 与三个 CTA 均存在。
- 首页、真实 Guide、真实 Class、真实 Database Category 的元数据检查通过。
- 浏览器控制台 error：0。

## 17. 所有验证命令及结果

全部以 exit code 0 通过：

```text
npm test
npm run typecheck
npm run lint
npm run build
node scripts/validate-spiritvale-assets.mjs
node scripts/validate-spiritvale-data.mjs
node scripts/validate-spiritvale-homepage.mjs
node scripts/validate-spiritvale-guides.mjs
node scripts/validate-spiritvale-classes.mjs
node scripts/validate-spiritvale-database.mjs
node scripts/validate-spiritvale-search.mjs
```

关键实际结果：Assets 26（52 个文件检查）、正式数据 20 条、5 Guides、7 Classes、7 Database Categories（0 个伪造条目）、Search Index 19 条、Sitemap 23 URLs、RSS 5 items、23 个发布静态路由 Technical SEO 检查通过。

## 18. 禁止项检查

- 未修改 SV-03 素材原文件或 SV-04 正式数据。
- 未建立第二套 Search / Database 数据，也没有硬编码搜索结果。
- 未生成 Skills、Equipment、Cards、Artifacts、Monsters、Bosses、Maps 的假记录。
- 未生成 AI 图片、竞争站图片、Steam Community、Reddit、YouTube 或外链图片。
- RSS 只读取真实 Guide `updatedAt`，Sitemap 只派生自正式发布路由。
- 仅生成本 Sprint 要求的唯一验收报告 `SV-10-SPRINT-REPORT.md`。

## 19. 已知限制

- 生产站点域名尚未提供；上线前必须设置 `SPIRITVALE_SITE_URL`，再重新构建 Discovery 文件。
- 当前 SV-04 数据没有已验证的单项 Database Entry，因此搜索只包含 7 个 Database Categories；未来正式数据加入后可通过同一服务扩展。
- Lighthouse CLI 在当前环境不可用，未运行评分；自动技术 SEO、响应式、可访问性基础检查已完成。
- Vite SPA 运行时 metadata 可用，构建时已为发布内容路由写出静态 metadata；实际部署仍应在最终托管环境复核 URL、缓存和 robots 响应头。

## 20. 下一步建议

1. 在发布环境设置正式 `SPIRITVALE_SITE_URL` 后运行 `npm run build`，提交更新后的 Sitemap、RSS、OpenSearch、robots。
2. 在可用的 CI / 浏览器环境安装或提供 Lighthouse 后，对 Homepage、Guide、Class、Database 运行真实 Lighthouse 测试并记录分数。
3. 随官方正式资料扩充 SV-04 数据时，扩展同一 Search Service 的单项 Database Records，继续保留来源、验证状态与空数据保护。
