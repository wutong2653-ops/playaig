# R3 Homepage UI Fix + Release Polish — PlayAIG V1.0

## 1. Release Decision

# PASS — ONLINE VERIFICATION REQUIRES USER

本地 dev、production preview、自动验证、GitHub 推送和 Vercel Production build 均已完成。最新 Vercel deployment 为 **Ready**；但 `playaig.com` 当前未绑定到该 Vercel team，且本执行环境对部署 URL 的在线 HTTP 请求超时，因此不能如实完成正式域名、HTTPS、直链刷新和线上视觉验收。请用户绑定 / 确认域名后完成一次线上确认。

## 2. 原问题复现

问题在本地 dev 的全部要求 viewport 复现，并在修复前的 DOM 测量中确认：

| Viewport | Hero 高度 | Hero 到 Quick Search 实际空白 |
| --- | ---: | ---: |
| 320 × 800 | 532px | 128px |
| 375 × 812 | 487px | 128px |
| 768 × 1024 | 296px | 128px |
| 1024 × 768 | 296px | 160px |
| 1280 × 800 | 328px | 160px |
| 1440 × 900 | 328px | 160px |
| 1600 × 900 | 328px | 160px |

- 对应 DOM：`.home-section--hero > .sv-hero` 与相邻 `section[aria-label="Quick search"] > .sv-feature-section`。
- Hero 没有异常 `height` / `min-height`：计算值 `min-height: 0px`，display 为 block。
- Hero 图片为 absolute background，但 Hero 内容正常参与布局，图片本身不是空白来源。
- 未发现空 grid row、flex-grow、隐藏内容占位、CSS 变量失效或生产 hydration 样式差异。
- 首页 Hero 图片在修复前后均正常 eager load；首屏外图片保持 lazy loading。

## 3. 根因

根因是相邻的两个 Design System `Section` wrapper 同时应用默认垂直 padding，造成边界 padding 累加：

- Hero Section：`padding-block-end` 为 64px（小于 1024px）或 80px（1024px 及以上）。
- Quick Search Section：`padding-block-start` 同样为 64px 或 80px。
- 因此视觉上产生 64 + 64 = 128px，或 80 + 80 = 160px 的裸露深色背景区域。

这是真实的重复 Section spacing，不是 Hero 高度、图片裁切、absolute positioning 或固定高度问题。

## 4. 修复内容

- 给 Quick Search Section 增加语义类 `home-section--quick-search`。
- Hero Section 的底部 spacing 改为现有 token `var(--sv-space-24)`。
- Quick Search Section 的顶部 spacing 改为同一现有 token `var(--sv-space-24)`。
- Hero 与 Quick Search 的边界间距稳定为 **48px**。
- 未使用负 margin、固定高度、隐藏模块或新 token；Hero 高度、图片比例、CTA、Header、数据和模块顺序均未改变。
- 修复生产 hydration 下静态 / 运行时 JSON-LD 叠加问题：运行时 metadata 更新会替换已有 JSON-LD，避免首页从 4 条、Guide 从 6 条的重复结构化数据状态。
- 添加 `vercel.json`，将 Vercel Output Directory 配置为真实构建输出 `dist-playground`，修复 `STATIC_BUILD_NO_OUT_DIR`。

## 5. 文件变更

### 修改

- `src/app/HomePage.tsx`：为 Quick Search Section 添加专用 spacing class。
- `src/app/site.css`：使用既有 24 spacing token 修复相邻 Section 边界。
- `src/app/site.ts`：运行时替换已有 JSON-LD，避免 hydration 重复。
- `package.json`：将新的 release UI 验证加入 `npm test`。
- `.gitignore`：忽略 Vercel 本地链接目录及本地环境文件，防止本地凭据被提交。

### 新增

- `scripts/validate-playaig-release-ui.mjs`：验证 Hero / Quick Search 结构、tokenized 48px 边界、首页模块、素材、生产 metadata 与 Discovery 输出。
- `vercel.json`：`outputDirectory: dist-playground`。
- 本报告：`reports/R3-HOMEPAGE-UI-RELEASE-POLISH.md`。

### 删除

- 无。

## 6. 首页模块验收

| 模块 | 结果 |
| --- | --- |
| Header | PASS：桌面导航、品牌图、Search、Theme Switch 正常；320px 无横向溢出。 |
| Hero | PASS：H1 可读、两枚 CTA 存在、官方 Hero 图片已加载、比例和高度未改变。 |
| Quick Search | PASS：320px 输入与按钮可换行；`mage` Enter 提交进入 `/search/?q=mage`，返回 Mage Class 与 Class Guide。 |
| Start Here | PASS：4 张已配置卡片，移动 1 列、768px 2 列、1024px 及以上 3 列。 |
| Explore Classes | PASS：7 个职业卡片存在，未添加伪造职业图。 |
| Game Database | PASS：7 个分类卡片存在，Coming Soon / Data Collection 状态保留，无假数量。 |
| Featured Guides | PASS：5 张 Guide 卡片，图片无损坏。 |
| Explore SpiritVale | PASS：4 张官方视觉卡片，移动端不溢出。 |
| Latest Updates | PASS：Empty State 与 Official Steam CTA 存在，无异常占位高度。 |
| Footer | PASS：移动单列；768px 及以上为 4 列，免责声明和外链存在。 |

## 7. 响应式

以下数据来自最终 `dist-playground` 的真实 production preview：

| Viewport | scrollWidth | Hero 高度 | Hero → Quick Search | Grid / Footer |
| --- | ---: | ---: | ---: | --- |
| 320 × 800 | 320px | 532px | 48px | 单列 cards / 单列 Footer |
| 375 × 812 | 375px | 487px | 48px | 单列 cards / 单列 Footer |
| 768 × 1024 | 768px | 296px | 48px | 2 列 cards / 4 列 Footer |
| 1024 × 768 | 1024px | 296px | 48px | 3 列 cards / 4 列 Footer |
| 1280 × 800 | 1280px | 328px | 48px | 3 列 cards / 4 列 Footer |
| 1440 × 900 | 1440px | 328px | 48px | 3 列 cards / 4 列 Footer |
| 1600 × 900 | 1600px | 328px | 48px | 3 列 cards / 4 列 Footer |

全部要求断点满足 `scrollWidth === viewport width`，无横向滚动；修复前的 128px / 160px 异常背景空白已消失。

## 8. 主题

- Dark 与 Light Theme 均在最终 production preview 实际切换成功（`documentElement.dataset.theme` 在 `dark`、`light` 间正确变化）。
- Theme Switch 在桌面 Header 和移动菜单中均保留。
- 修复只作用于 Section padding，不改变主题颜色、背景 token 或图片 overlay。

## 9. Accessibility

- Homepage 与回归页面均为单一主 H1。
- Skip Link 存在。
- `.sv-focusable` focus style 保留；CTA、卡片链接、Search、Theme Switch 可键盘访问。
- Header 移动菜单 `aria-expanded` 正常；实际测试打开后为 `true`，Escape 后为 `false`，菜单移除。
- SearchBox 具备 label；Quick Search 的 Enter 提交已实际验证。
- 所有已加载图片无坏图，并继续来自 Asset Resolver 的登记 alt。
- `prefers-reduced-motion` 规则保留。
- 未对 Design System 色彩 token、对比度或交互体系做不必要重建。

## 10. 性能

- 最终 build：97 modules；JS 305.23 kB（gzip 83.91 kB）；CSS 21.06 kB（gzip 3.53 kB）；build 约 430ms。
- Hero 使用 `priority`，实际 production preview 中 `heroImageReady: true`。
- 首屏外 `AssetImage` 保持 `loading="lazy"`；未新增第三方脚本、UI 库、动画库或重复图片请求。
- 浏览器 production preview console errors：0；最终测试路径坏图：0。
- Lighthouse 未运行：项目未安装 Lighthouse（`npm ls lighthouse --depth=0` 显示 empty），未安装或伪造任何分数。

## 11. SEO 回归

- Homepage Title / Description、Canonical、Open Graph、Twitter、Organization JSON-LD、WebSite JSON-LD 均保留 PlayAIG 生产配置。
- 所有索引页面 Canonical 继续为 `https://playaig.com/...`。
- Search 与 404 保持 `noindex,follow`；最终 production preview 分别保留 0 条不适用 JSON-LD。
- 最终 JSON-LD 数量：Homepage 2、Guide Index 2、Guide Detail 3、Classes Index 2、Class Detail 2、Database Index 2、Database Category 2；无 hydration 重复。
- Sitemap 23 URLs、robots、RSS 5 items、OpenSearch、site.webmanifest 都在 source 与 build output 中存在。
- 生产 URL 扫描继续通过，无 `localhost`、`127.0.0.1`、`example.com`、`spiritvale.example` 回退。

## 12. 回归页面

最终 production preview 直接访问以下路径均正常渲染，Header / Footer（Playground 除外）、唯一 H1、Canonical、JSON-LD（适用页面）、无横向溢出、0 坏图均通过：

```text
/
/guides/
/guides/beginner-guide/
/classes/
/classes/mage/
/database/
/database/bosses/
/search/?q=mage
/404/
/playground/
```

`/playground/` 是组件预览页面，正常渲染；它展示多个组件标题，因此不按内容页面的单一 H1 规则计数。

## 13. 验证命令

以下命令均实际执行并以 exit code 0 通过：

```text
npm install
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
node scripts/validate-playaig-release-ui.mjs
npx vite preview --outDir dist-playground --host 127.0.0.1
```

新增 UI 验证实际结果：Hero-to-Quick-Search boundary 48px、首页 9 个 Section、26 条登记素材、5 个 production discovery artifacts 通过。

## 14. 浏览器验收

- 本地 dev：修复前后在 320、375、768、1024、1280、1440、1600 全部测量。
- 最终 production preview：上述七个 viewport 全部测量；Hero 与 Quick Search 均为 48px，无横向溢出。
- Console errors：0。
- Broken images：0。
- Mobile Menu：实际打开成功，Escape 实际关闭成功。
- Theme Switch：Dark / Light 实际切换成功。
- Quick Search：实际输入 `mage` 并用 Enter 提交，正确进入 `/search/?q=mage`。
- Direct route refresh：最终 production preview 的 Guides、Guide Detail、Classes、Class Detail、Database、Database Category、Search、404、Playground 均直接打开并渲染。
- 线上 Vercel preview 浏览器导航与 Vercel CLI HTTP curl 在当前执行环境超时，未将其误记为线上通过。

## 15. Git

- Branch：`main`。
- Remote：`git@github.com:wutong2653-ops/playaig.git`。
- Push result：全部推送成功到 `origin/main`。
- UI / metadata commit：`1eb7c71b2dc0877f8918ebb609a5c16f849f7c26` — `Fix homepage spacing and polish production release`。
- Vercel Output Directory commit：`1f94921603a715f29f580ef3eb149c55f5c01610` — `Configure Vercel production output`。
- Final clean-worktree safety commit：`321aae40445070eceed4eef18ec2659772d4f841` — `Ignore local Vercel files`。
- 最新 `main` HEAD：`321aae40445070eceed4eef18ec2659772d4f841`。

## 16. Vercel

- Project：`playaig`（既有项目，未创建第二个项目）。
- 首次 R3 自动部署真实失败：`STATIC_BUILD_NO_OUT_DIR`；Vercel 默认寻找 `dist`，而项目实际输出为 `dist-playground`。
- 最小 `vercel.json` Output Directory 修复推送后，最新 Production deployment 状态：**Ready**。
- 最新 Deployment URL：`https://playaig-rlyggrbxb-wutong2653-7770s-projects.vercel.app`。
- Build status：Ready，实际持续 10 秒。
- Online verification：未完成。浏览器请求与 `vercel curl` 取得 deployment protection bypass 后仍在 15 秒内超时；没有伪造 HTTP / UI 结果。
- `vercel domains inspect playaig.com` 返回 Domain not found，因此正式域名目前未绑定到该 Vercel team。

## 17. 禁止项检查

- 未新增业务功能、页面、组件、游戏或营销模块。
- 未修改正式数据模型、Database entries、Guide 事实内容或 Class 事实内容。
- 未使用 AI 游戏图片、竞争站图片或外链游戏图片。
- 未重写首页、设计系统或信息架构；未删除任何首页模块。
- 未使用负 margin、固定高度或隐藏内容来掩盖空白。
- 未修改 DNS、提交 Search Console、添加 GA4 或伪造 Lighthouse。
- 未创建第二个 Vercel Project；未执行 DNS / 域名绑定操作。
- 仅新增一个允许的 production UI 验证脚本和一个最小 Vercel Output Directory 配置。

## 18. 已知限制

1. `playaig.com` 未绑定到当前 Vercel team，无法验证正式域名和 HTTPS。
2. 当前执行环境对 Ready Vercel deployment 的外部 HTTP / 浏览器请求超时；线上路由、刷新、资源、console 和视觉状态需要用户从可访问网络确认。
3. 由于不能获取线上页面响应，不在未验证情况下添加宽泛 SPA Rewrite；本地 production preview 的所有需要路径均可直达。
4. Lighthouse CLI 不存在，未产生真实性能评分。

## 19. 下一步建议

1. 用户在 Vercel 项目中绑定 `playaig.com`，按 Vercel 给出的 DNS 记录完成验证，并确认 HTTPS 证书生效。
2. 用户在可访问网络下打开最新 Vercel deployment URL 或正式域名，检查首页 Hero / Quick Search、所有回归路由、Discovery 文件和浏览器 console。
3. 如 Vercel 上 `/search/?q=mage` 或其他非预渲染路径刷新失败，提供结果后再添加最小且不覆盖静态预渲染路由的 Rewrite。
4. 在具备 Lighthouse 的环境执行 Homepage、Beginner Guide、Mage Class、Bosses Database 的真实 Lighthouse 测试。
