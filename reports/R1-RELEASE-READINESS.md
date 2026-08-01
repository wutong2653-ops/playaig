# R1 Release Readiness Check — SpiritVale V1.0

## Release Decision

# NOT READY

本地功能、数据、素材、SEO 结构和构建均已通过，但没有可用于生产发布的正式站点域名或部署配置。当前 Discovery 文件使用保留示例域 `https://spiritvale.example`，不能作为真实上线站点的 Sitemap、robots、RSS、OpenSearch 或静态社交 metadata。必须先提供并配置正式 HTTPS 域名与托管 / 部署配置，再执行生产构建和线上复验。

## 检查结论

| 范围 | 结果 | 证据 |
| --- | --- | --- |
| Homepage | PASS | 375 宽度正常渲染、唯一 H1、无图片故障、无横向滚动。 |
| Guides | PASS | Index 与 `beginner-guide` 正常，唯一 H1、metadata、3 份适用 JSON-LD。 |
| Classes | PASS | Index 与 Mage Detail 正常，唯一 H1、metadata、2 份 JSON-LD。 |
| Database | PASS | Index 与 Bosses Category 正常，空数据状态真实呈现，2 份 JSON-LD。 |
| Search | PASS | `mage` 返回 Mage Class 与 SpiritVale Class Guide；空结果逻辑已验证。 |
| 404 | PASS | 未知路径进入 Page not found，而非白屏。 |
| Assets | PASS | 26 条素材登记、52 个图片文件读取检查、缺失素材 0。 |
| Data | PASS | 13 schemas、26 data files、20 formal records；重复 ID / slug、无效 source、image、reference 均为 0。 |
| SEO 结构 | PASS（待生产域名） | 23 个发布静态路由的 Description、Canonical、OG、Twitter、JSON-LD 检查通过。 |
| Discovery | STRUCTURALLY PASS / PRODUCTION BLOCKED | Sitemap 23 URL、RSS 5 Guide items、robots、OpenSearch 均生成，但 URL 基址为保留示例域。 |
| Responsive | PASS | 375 / 768 / 1024 / 1440 的验收页面均无横向滚动。 |
| Accessibility 基础项 | PASS | 唯一 H1、Skip Link、可聚焦控件、SearchBox 语义、图片 alt、ARIA / focus 体系存在。 |
| Build | PASS | `npm test`、TypeScript、ESLint、production build 全部 exit code 0。 |
| Production / Deployment Config | FAIL | `SPIRITVALE_SITE_URL` 未配置；未发现 `.openai/hosting.json` 或其他受检部署配置。 |
| Lighthouse | NOT RUN | Lighthouse CLI 不在 PATH 或项目依赖中；未伪造评分。 |

## 本 Sprint 完成的整理与修复

- 在 [index.html](/Users/cj/Documents/SpiritVale站/index.html) 声明了现有官方品牌图标 favicon、`theme-color`、`site.webmanifest` 和 OpenSearch discovery link。
- 新增 [site.webmanifest](/Users/cj/Documents/SpiritVale站/public/site.webmanifest)，只引用现有 `spiritvale-brand-icon.webp`；未引入 AI 图片、外链图片或新页面。
- 重新完成完整自动验证、production build 和本地浏览器验收。

## 功能与浏览器验收

本地站点 `http://127.0.0.1:5173` 验收后已关闭开发服务器和浏览器标签。

| 宽度 | 路径 | 结果 |
| ---: | --- | --- |
| 375 | `/` | Homepage 正常、无横向滚动、无坏图。 |
| 375 | `/search/?q=mage` | Mage Class 与 SpiritVale Class Guide 正常出现；无坏图、无横向滚动。 |
| 768 | `/guides/` | Guides Index 正常。 |
| 768 | `/guides/beginner-guide/` | Guide Detail 正常。 |
| 1024 | `/classes/` | Classes Index 正常。 |
| 1024 | `/classes/mage/` | Mage Detail 正常。 |
| 1440 | `/database/` | Database Index 正常。 |
| 1440 | `/database/bosses/` | Bosses Empty State 正常。 |
| 1440 | `/not-a-spiritvale-page` | 404 正常，无白屏。 |

所有受检页面都具备非空 Title、Description、Canonical、OG 与 Twitter metadata；可索引发布页面具备适用 JSON-LD。Search 与 404 按设计使用 `noindex,follow`，不输出不适用的 JSON-LD。浏览器控制台 error：**0**；受检页面的失败图片：**0**；外链图片：**0**。

## 数据、素材与搜索

- 正式数据：5 Guides、7 Base Classes、7 Database Categories；Database Entries 保持 0，未制造假数据。
- Search Index：19 条派生记录（5 Guides、7 Classes、7 Database Categories），不维护第二套数据。
- 素材：26 条 manifest assets，来源统计为 official-press-kit 18、official-steam 8；所有 `imageAssetId` 可解析。
- 发现文件：Sitemap 23 个唯一发布 URL；RSS 5 个真实 Guide items，日期来自正式 `updatedAt`；Search、404、Playground 不在 Sitemap 内。

## Accessibility 与响应式

- 已核验唯一主 H1、Skip Link、可键盘到达的链接 / 按钮 / 搜索控件、SearchBox 语义、现有 focus styles、图片 alt 与 ARIA 标记。
- 375、768、1024、1440 受检页面 `scrollWidth <= innerWidth`，无横向滚动。
- 受检 Guide 页存在 Skip Link、1 个搜索输入和 54 个可聚焦交互元素。
- 此检查不替代人工辅助技术测试或正式色彩对比度审计；当前 Design System 的既有 WCAG AA token 体系未出现自动检查失败。

## 生产配置与 Discovery Files

- Favicon：已声明，使用已登记的官方品牌 icon（1000 × 1000 WebP）。
- Manifest：已声明并通过 JSON 读取验证；包含同一官方品牌 icon、名称、short name、theme / background color。
- OpenSearch：已生成且在 HTML 声明。
- Sitemap、robots、RSS、OpenSearch：源码与 `dist-playground/` 构建输出都存在。
- **阻断**：`SPIRITVALE_SITE_URL` 未配置，生成器回退到 `https://spiritvale.example`；该值出现在 Sitemap、robots、RSS 和 OpenSearch。
- **阻断**：未发现发布平台 / 托管配置，因此无法确认生产 HTTPS、SPA fallback、缓存策略、404 响应、robots 响应头或真实域名下的 Canonical / OG URL。

## Performance

Lighthouse 未执行。实际检查结果：`command -v lighthouse` 不存在，`npm ls lighthouse --depth=0` 显示项目未安装 Lighthouse（该检查命令因依赖缺失返回 exit code 1）。本报告不提供或推测 Performance、Accessibility、Best Practices、SEO 分数。

当前 production build 成功：Vite 转换 97 modules，输出 JS 304.89 kB（gzip 83.78 kB）、CSS 20.95 kB（gzip 3.52 kB），构建耗时约 372 ms。这是构建产物大小，不是 Lighthouse 性能评分。

## 自动验证命令与真实结果

以下命令均以 exit code 0 通过：

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

构建后还确认：`dist-playground/site.webmanifest`、`opensearch.xml`、`robots.txt`、`rss.xml`、`sitemap.xml` 均存在。Web Manifest JSON 有效并声明官方品牌图标。

## Known Issues

### Critical

1. **未配置正式 Site URL。** `SPIRITVALE_SITE_URL` 为空，公开 Discovery 文件指向 `https://spiritvale.example` 保留示例域。搜索引擎与订阅器会索引错误主机，不能上线。
2. **没有可验证的部署配置 / 生产目标。** 未检测到托管配置，无法验证正式域名、HTTPS、SPA rewrites、production 404、缓存与响应头。上线前必须指定并配置实际托管平台。

### Major

1. **缺少真实 Lighthouse 验收。** 当前环境没有 Lighthouse CLI 或项目依赖；不能确认四类页面是否达到预期的 Performance / Accessibility / Best Practices / SEO 分数。

### Minor

- 无新增 Minor 阻断项。Database 单项记录仍为空是正式数据状态，页面已明确显示 Data Collection In Progress，不构成发布缺陷。

## Release Gate 建议

1. 提供正式 HTTPS 域名，并以该值设置 `SPIRITVALE_SITE_URL`。
2. 配置并确认实际部署平台的静态托管、SPA fallback、404、缓存、HTTPS 与 robots / sitemap 可访问性。
3. 在正式域名下重新运行 `npm run build`，提交生成的 Sitemap、robots、RSS、OpenSearch，并复核所有 Canonical、OG、Twitter 与 JSON-LD 的最终 URL。
4. 在具备 Lighthouse 的环境对 Homepage、Guide、Class、Database 执行真实 Lighthouse，记录四项评分并处理失败项。
5. 完成以上四项后，重新执行 R1 Release Readiness Check；届时可基于生产证据重新判断 `READY FOR RELEASE`。
