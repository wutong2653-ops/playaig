# SV-08 SpiritVale Classes System & 7 Base Class Pages — Sprint Report

## 1. 完成内容

- 建立 Classes Index：`/classes/`，包含 Hero、由正式数据驱动的 7 张 Class Card、验证提示、两篇关联攻略和 Footer。
- 建立统一 `ClassLayout` 与一套共享 Class 详情模板；没有复制七套页面。
- 建立 7 个基础职业详情页、Class Breadcrumb、统一 Header、验证徽章、官方已确认信息、未确认信息说明、验证状态、未来更新、来源、关联攻略和免责声明。
- 建立 Class 数据读取层：`getClassBySlug`、`getGuidesRelatedToClass` 与统一 `classVisualAssetId`。
- 保持 `data/spiritvale/classes/classes.json` 的职业真实数据不变；为既有 Beginner Guide 与 Class Guide 的正式 `relatedClassIds` 添加七个基础职业关系，供详情页反向读取关联攻略。
- 为 Classes Index 与 7 个详情页增加独立 SEO metadata、canonical、Open Graph、Twitter Card 和静态 route metadata 输出。
- 为详情页增加 Article 与 BreadcrumbList JSON-LD；没有生成 FAQ JSON-LD。
- 新增 `validate-spiritvale-classes.mjs`，并将其纳入 `npm test`。
- 扩展 Design System 组件文档，并为 Breadcrumb 链接添加统一焦点样式类。

## 2. 文件变更

### Classes 页面、路由与样式

- `src/app/App.tsx`
- `src/app/ClassesIndexPage.tsx`
- `src/app/ClassDetailPage.tsx`
- `src/app/site.ts`
- `src/app/site.css`
- `src/components/classes/index.tsx`
- `src/components/index.ts`
- `src/components/guides/index.tsx`
- `src/design-system/components/spiritvale.tsx`

### 数据读取、关系与文档

- `src/data/types.ts`
- `src/data/content.ts`
- `data/spiritvale/guides/guides.json`
- `docs/design-system/COMPONENTS.md`

### 构建与验证

- `scripts/prerender-spiritvale-classes.mjs`
- `scripts/validate-spiritvale-classes.mjs`
- `package.json`
- `reports/SV-08-SPRINT-REPORT.md`

## 3. Classes 页面清单

| 页面 | 路径 | 状态 |
| --- | --- | --- |
| Classes Index | `/classes/` | 完成 |
| Acolyte | `/classes/acolyte/` | 完成 |
| Mage | `/classes/mage/` | 完成 |
| Summoner | `/classes/summoner/` | 完成 |
| Knight | `/classes/knight/` | 完成 |
| Warrior | `/classes/warrior/` | 完成 |
| Scout | `/classes/scout/` | 完成 |
| Rogue | `/classes/rogue/` | 完成 |
| Unknown Class | `/classes/test` | 安全 Not Found |

## 4. 数据来源说明

- 七个职业均读取 SV-04 正式数据：`data/spiritvale/classes/classes.json`。
- 职业记录只使用已确认的名称、Base Class 身份、`verificationStatus` 和已登记的官方来源。
- 每个职业的来源为 `SpiritVale Official Steam Store`，source owner 为 Baikun Interactive。
- 关联攻略不在职业数据中另建第二套映射：既有 Guide 数据的 `relatedClassIds` 记录职业关系，读取层据此反向解析。

## 5. 图片接入情况

- 职业独立图片仍未登记，因此没有伪造、裁切或声称存在七张职业肖像。
- Classes Index 和所有职业详情页统一复用 SV-03 已登记素材 `sv-guide-classes-selection-banner`。
- 页面明确标注该图为通用官方职业视觉，而非某个职业的肖像。
- 所有图片经 `imageAssetId` 与 Asset Resolver 接入；未使用裸 `src="/images/..."`、外链图片、Steam Community 图片或 AI 游戏截图。

## 6. Related Guides

- 每个基础职业通过正式 Guide 关系读取并显示两篇攻略：
  - `SpiritVale Beginner Guide`
  - `SpiritVale Class Guide`
- Classes Index 同样从 Guide 关系读取这两篇攻略。
- 自动校验确认 7 个职业共 14 条有效关联攻略引用。

## 7. SEO

- Classes Index title：`SpiritVale Classes — Explore the Seven Base Classes`。
- Classes Index description：`Explore all officially confirmed SpiritVale base classes and follow future verified class updates.`
- 每个职业详情页拥有唯一 title、description、canonical、Open Graph 和 Twitter Card。
- 生产构建生成 `/classes/` 与 7 个 `/classes/<slug>/index.html` 静态 metadata 文件。

## 8. JSON-LD

- Classes Index：`CollectionPage` 与 `BreadcrumbList`。
- 每个职业详情页：`Article` 与 `BreadcrumbList`。
- 所有职业详情页均不生成 `FAQPage`，避免为事实不足的职业信息虚构 FAQ。

## 9. Responsive

已在下列宽度完成本地浏览器验收，均无横向滚动：

- 375px：Classes Index、Class Grid、移动导航及 Escape 关闭行为正常。
- 768px：Acolyte 详情页的统一模板、来源、两篇关联攻略、JSON-LD 和图片正常。
- 1024px：Mage 页面无横向溢出，主题可切换，Breadcrumb 链接具有统一焦点类。
- 1440px：七个职业详情页均正常显示，无损坏图片。

## 10. Accessibility

- 每个 Classes Index 和职业详情页仅有一个 H1。
- 所有详情页包含语义 Breadcrumb、来源链接、Alt 文本、Skip Link 与可见焦点样式类。
- Class Card 使用描述性的 `View details for <class>` 可访问名称。
- 移动导航的开启/关闭按钮具有明确 label 和 `aria-expanded`；Escape 可关闭导航。
- FAQ 未用于职业页，避免不必要的交互与未验证内容。

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

- Vite 成功转换 83 个模块。
- Guide 静态 metadata 输出通过，路由文件 5 个。
- Class 静态 metadata 输出通过，详情路由文件 7 个。

## 14. 浏览器验收

- Classes Index：H1 正确、7 张职业卡片、统一官方 Banner、两篇关联攻略、CollectionPage/BreadcrumbList JSON-LD 均存在。
- Acolyte：H1、canonical、Article/BreadcrumbList JSON-LD、所有必需内容区块、1 条官方来源、2 篇关联攻略和图片加载均通过。
- 七个职业详情页：专属 title、正确 H1、canonical、1 条来源、2 篇关联攻略、0 个 FAQ、0 张损坏图片、0 横向溢出。
- `/classes/test`：显示 `Class not found` 和安全 Empty State，不白屏。
- 主题从 Dark Mode 切换至 Light Mode 通过。
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
```

结果：全部通过，退出码 0。

- `npm test`：Homepage、Guides、Classes 验证全部通过。
- `validate-spiritvale-classes.mjs`：7 个正式基础职业、7 个唯一 slug、7 条唯一 canonical、14 条关联攻略、共享官方视觉、共享模板、Article/Breadcrumb JSON-LD、Sources、Related Guides 和 Not Found 均通过。
- `validate-spiritvale-assets.mjs`：26 个 manifest 素材、26 个唯一 raw source、52 个图片文件均可读取。
- `validate-spiritvale-data.mjs`：13 个 schema、26 个数据文件、20 条正式记录；重复 ID/slug、无效引用、无效图片资产 ID、无效来源 ID 均为 0。
- `validate-spiritvale-homepage.mjs` 与 `validate-spiritvale-guides.mjs`：继续通过。

## 16. 禁止项检查

- 未补充职业 Weapon、Role、Main Stat、Difficulty、Skills、Strengths、Weaknesses、Build、Equipment、Progression 或 Advanced Class 信息。
- 未修改 SV-03 原始素材；未创建或使用 AI 游戏截图。
- 未使用竞争 Wiki、Reddit、Steam Community、来源不明图片或外链游戏图片。
- 未创建第二套 Classes 数据或七套复制页面模板。
- 未修改 `data/spiritvale/classes/classes.json` 中的职业真实数据。
- 未创建第二份 SV-08 验收报告。

## 17. 已知限制

- 当前每个职业可确认的个人信息只有名称与 Base Class 身份，因此全部维持 `partially-verified`。
- 职业独立官方图片尚未登记；当前统一使用已注明用途的通用官方职业 Banner。
- 只有第一方 Steam 商店页可用于现有职业事实；尚无法安全提供职业玩法、技能或装备细节。
- 本 Sprint 按要求未部署站点。

## 18. 下一步建议

1. 在官方 Press Kit、Steam 新闻或经确认的游戏内截图提供职业独立素材后，新增经过来源登记的职业视觉资产。
2. 仅在获得第一方职业说明后，向原有 Class 数据补充角色定位、武器、技能、属性或进阶职业关系，并更新验证状态。
3. 后续 Build、Skills 与 Database 页面应继续通过现有 Class 读取层、Asset Resolver、来源登记和验证状态流程引用职业数据。
