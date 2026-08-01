# SV-09 SpiritVale Database System — Sprint Report

## 1. 完成内容

- 建立 Database 首页：`/database/`，包含 Hero、7 个分类卡片、验证提示、数据驱动关联攻略和 Footer。
- 建立统一 `DatabaseLayout` 与一套分类详情模板；7 个分类页面均复用该模板，没有复制页面实现。
- 建立 Skills、Equipment、Cards、Artifacts、Monsters、Bosses、Maps 七个分类页及安全的未知分类页。
- 建立数据库读取层：分类、正式集合读取、分类 slug 查询、分类关联攻略查询和集合计数均来自现有数据层。
- 保持七个 SV-04 数据库集合为空；页面以 `Data Collection In Progress` Empty State 呈现真实状态，未生成任何数据库条目。
- 扩展既有 Guide 记录的 `relatedDatabaseCategoryIds` 正式关系字段，使分类页的关联攻略从 Guide 数据读取，而非页面硬编码。
- 建立每个分类的验证状态、官方来源、Browse Guides CTA、通用官方图片说明、SEO、CollectionPage/BreadcrumbList JSON-LD 与静态 metadata 输出。
- 新增 `validate-spiritvale-database.mjs`，并纳入 `npm test`。

## 2. 文件变更

### Database 页面、路由与组件

- `src/app/App.tsx`
- `src/app/DatabaseIndexPage.tsx`
- `src/app/DatabaseCategoryPage.tsx`
- `src/app/site.ts`
- `src/app/site.css`
- `src/components/database/index.ts`
- `src/components/database/templates.tsx`
- `src/components/index.ts`

### 数据读取、关系与 schema

- `src/data/types.ts`
- `src/data/content.ts`
- `schemas/spiritvale/guide.schema.json`
- `data/spiritvale/guides/guides.json`

### 构建、验证与文档

- `scripts/prerender-spiritvale-database.mjs`
- `scripts/validate-spiritvale-database.mjs`
- `package.json`
- `docs/design-system/COMPONENTS.md`
- `reports/SV-09-SPRINT-REPORT.md`

## 3. Database 页面清单

| 页面 | 路径 | 状态 |
| --- | --- | --- |
| Database Index | `/database/` | 完成 |
| Skills | `/database/skills/` | Empty State |
| Equipment | `/database/equipment/` | Empty State |
| Cards | `/database/cards/` | Empty State |
| Artifacts | `/database/artifacts/` | Empty State |
| Monsters | `/database/monsters/` | Empty State |
| Bosses | `/database/bosses/` | Empty State |
| Maps | `/database/maps/` | Empty State |
| Unknown Category | `/database/test` | 安全 Not Found |

## 4. 数据来源

- Skills、Equipment、Cards、Artifacts、Monsters、Bosses、Maps 均直接读取对应 SV-04 正式集合。
- 七个集合当前均为 `[]`；实际已验证数据库条目为 0。
- 页面没有创建第二套 Database 数据、没有填充演示记录，也没有改写任何空集合。
- 通用页面来源由既有 Source 数据读取：`SpiritVale Official Steam Store`，source owner 为 Baikun Interactive。
- 分类与攻略关系存储在既有 Guide 数据的 `relatedDatabaseCategoryIds` 中；共 8 条有效关系引用。

## 5. 图片接入

- 所有页面图片均通过已登记的 `imageAssetId` 和 Asset Resolver 读取。
- 7 个分类使用 6 个 SV-03 官方通用视觉资产；Cards 与 Artifacts 复用同一张通用官方 Build 视觉，不创建伪造的独立卡牌或神器图片。
- 每个分类页明确显示：`This image is a general official visual rather than a verified database entry.`
- 未使用 AI 图片、竞争 Wiki、Steam Community、Reddit、YouTube 缩略图、外链游戏图片或直接图片路径。

## 6. Related Guides

分类关联攻略均由正式 Guide 关系读取：

| 分类 | 关联 Guide |
| --- | --- |
| Skills | Class Guide |
| Equipment | Beginner Guide、Stats Guide |
| Cards | Card System Guide |
| Artifacts | Card System Guide |
| Monsters | Leveling Guide |
| Bosses | Beginner Guide |
| Maps | Beginner Guide |

Database 首页从全部类别关系去重后显示关联攻略集合。

## 7. SEO

- Database 首页 title：`SpiritVale Database`。
- Database 首页 description：`Browse officially verified SpiritVale game data including skills, equipment, cards, artifacts, monsters, bosses and maps.`
- 七个分类页均有唯一 title、description、canonical、Open Graph 和 Twitter Card。
- 生产构建生成 `/database/` 与 7 个 `/database/<category>/index.html` 静态 metadata 文件。

## 8. JSON-LD

- Database 首页：`CollectionPage` 与 `BreadcrumbList`。
- 每个分类页：`CollectionPage` 与 `BreadcrumbList`。
- 没有生成 `Article` 或 `FAQPage` JSON-LD。

## 9. Responsive

本地浏览器在以下宽度完成验收，所有检查页面均无横向滚动：

- 375px：Database 首页、7 张分类卡片与移动导航正常。
- 768px：Bosses 分类页 Empty State、来源、关联攻略和 JSON-LD 正常。
- 1024px：Cards 分类页单 H1、Skip Link、可聚焦 Breadcrumb 和主题切换正常。
- 1440px：7 个分类页均加载正常，无损坏图片。

## 10. Accessibility

- Database 首页与每个分类页均只有一个 H1。
- 页面包含 Breadcrumb、Skip Link、Alt 文本、可见焦点样式和语义来源链接。
- 分类卡片使用描述性可访问名称，例如 `Browse Skills database`。
- 移动导航具备 label、`aria-expanded` 和 Escape 关闭行为。
- Empty State CTA 为可键盘访问的 `Browse Guides` 链接。

## 11. TypeScript

命令：

```bash
npm run typecheck
```

结果：通过（`tsc -b --pretty false`，退出码 0）。

## 12. ESLint

命令：

```bash
npm run lint
```

结果：通过（`eslint .`，退出码 0）。

## 13. Build

命令：

```bash
npm run build
```

结果：通过，退出码 0。

- Vite 成功转换 93 个模块。
- Guide 静态 metadata 输出通过：5 条 Guide 路由。
- Class 静态 metadata 输出通过：7 条 Class 路由。
- Database 静态 metadata 输出通过：7 条分类详情路由，另含 Database 首页。

## 14. 浏览器验收

- Database 首页：H1 正确、7 张分类卡片、7 个 `Data Collection In Progress` 标签、CollectionPage/BreadcrumbList JSON-LD 均存在。
- Bosses 分类页：单 H1、canonical、无 Article JSON-LD、真实 Empty State、Browse Guides CTA、1 条官方来源、1 篇关联攻略和 0 张损坏图片。
- 七个分类详情页：专属 title、正确 H1、canonical、Awaiting Official Information 状态、Empty State、来源、数据驱动关联攻略、CollectionPage/BreadcrumbList JSON-LD、0 张损坏图片和 0 横向溢出。
- `/database/test`：显示 `Database category not found` 和安全 Empty State，不白屏。
- Dark Mode 至 Light Mode 主题切换通过。
- 浏览器控制台错误：0。

## 15. 所有验证命令及结果

执行：

```bash
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
```

结果：全部通过，退出码 0。

- `npm test`：Homepage、Guides、Classes、Database 验证全部通过。
- `validate-spiritvale-database.mjs`：7 个分类、7 条唯一 canonical、0 条已验证数据库记录、8 条关联攻略、6 个通用图片资产、共享模板、Empty State、Sources、Related Guides、JSON-LD 和 Not Found 均通过。
- `validate-spiritvale-assets.mjs`：26 个 manifest 素材、26 个唯一 raw source、52 个图片文件均可读取。
- `validate-spiritvale-data.mjs`：13 个 schema、26 个数据文件、20 条正式记录；重复 ID/slug、无效引用、无效图片资产 ID、无效来源 ID 均为 0。
- `validate-spiritvale-homepage.mjs`、`validate-spiritvale-guides.mjs`、`validate-spiritvale-classes.mjs` 均继续通过。

## 16. 禁止项检查

- 未生成任何 Skills、Equipment、Cards、Artifacts、Monsters、Bosses 或 Maps 条目。
- 未创建第二套 Database 数据或第二套分类模板。
- 未修改 SV-03 原始素材，也未添加 AI 图片。
- 未引用竞争 Wiki、Steam Community、Reddit、YouTube 或来源不明素材。
- 未在页面中写入 Boss HP、Boss Drops、Boss Skills、Card Effect、Skill Damage、Equipment Stat、Monster Drop 或 Map Coordinates 等虚构数据。
- 仅新增 Guide 与分类的关系元数据；七个 SV-04 数据库正式集合保持原样为空。
- 仅生成一份 SV-09 验收报告。

## 17. 已知限制

- 当前所有七个正式数据库集合均为空，因此每个分类都处于 `Awaiting Official Information` 状态。
- 当前不存在已确认的独立技能、装备、卡牌、神器、怪物、Boss 或地图图片；分类页仅使用明确标注为通用的官方视觉。
- 官方 Steam 商店页可作为当前的一般第一方来源，但不足以安全填写任何具体数据库条目。
- 本 Sprint 按要求未部署站点。

## 18. 下一步建议

1. 仅在取得可追溯的第一方来源后，向对应现有 SV-04 数据库集合新增单条正式记录，并同步填写 sourceIds、imageAssetIds 和 verificationStatus。
2. 在官方新闻、Press Kit 更新或已确认游戏内截图出现后，为具体条目补充来源登记的独立图片；不要将通用视觉误标为条目图片。
3. 后续 Database 列表/详情实现应继续使用现有读取层、Asset Resolver、来源登记、验证状态和 Empty State 流程，而不是建立平行数据源。
