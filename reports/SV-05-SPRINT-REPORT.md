# SV-05 SpiritVale Design System & Component Library — Sprint Report

## 1. 完成内容

- 建立了以 Dark Mode 为默认值、Light Mode 可直接切换的 SpiritVale 设计系统。
- 建立集中式 Design Tokens：颜色、字体、间距、圆角、阴影、动效、断点、层级，以及可复用组件尺寸。
- 建立 10 个基础组件、6 个布局组件、14 个 SpiritVale 专属展示组件，全部使用 TypeScript。
- 所有图片相关组件只接受 imageAssetId；组件不会接受、拼接或写入图片 URL / 图片路径。
- 建立了 src/components 下 base、layout、cards、database、homepage、navigation、feedback 七个兼容导出目录。
- 建立 Vite + React + TypeScript 的组件 Playground；它只展示组件，不包含业务页面、游戏数据、文章或 SEO。
- 完成设计系统、Token、组件和响应式规范文档。
- 未修改 SV-03 素材、SV-04 数据模型、数据内容或既有业务页面。

## 2. 文件变更

### Tooling and Playground

- .gitignore
- package.json
- package-lock.json
- tsconfig.json
- tsconfig.app.json
- tsconfig.node.json
- eslint.config.mjs
- vite.config.ts
- index.html
- playground/App.tsx
- playground/main.tsx

### Design System

- src/design-system/tokens/: colors, typography, spacing, radius, shadow, motion, breakpoints, zIndex, component, index
- src/design-system/components/: DesignSystemProvider, themeContext, base, layout, spiritvale, index
- src/design-system/icons/: Icon, index
- src/design-system/hooks/: useTheme, useDesignSystem
- src/design-system/utils/: cn, theme
- src/design-system/styles/: design-system.css, index
- src/design-system/index.ts

### Compatibility Exports and Documentation

- src/components/index.ts
- src/components/base/index.ts
- src/components/layout/index.ts
- src/components/cards/index.ts
- src/components/database/index.ts
- src/components/homepage/index.ts
- src/components/navigation/index.ts
- src/components/feedback/index.ts
- docs/design-system/README.md
- docs/design-system/TOKENS.md
- docs/design-system/COMPONENTS.md
- docs/design-system/RESPONSIVE.md

## 3. Design Tokens 清单

| Token file | 内容 |
| --- | --- |
| colors.ts | Primary、Secondary、Accent、Background、Surface、Border、Text、Success、Warning、Danger、Focus 的 dark/light 语义色。 |
| typography.ts | Display、H1、H2、H3、H4、Body、Small、Caption、Code 的字号、行高与字重。 |
| spacing.ts | 唯一间距刻度：4、8、12、16、24、32、48、64、80。 |
| radius.ts | none、sm、md、lg、pill。 |
| shadow.ts | sm、md、focus。 |
| motion.ts | fast、base、slow 与统一 easing。 |
| breakpoints.ts | 375、768、1024、1280、1440。 |
| zIndex.ts | base、sticky、dropdown、overlay、modal、tooltip。 |
| component.ts | 统一的边框、控件高度、头像、载入器、内容宽度等非间距组件原语。 |

颜色由 DesignSystemProvider 映射为 CSS custom properties。组件源码没有硬编码颜色或间距；颜色语义与前景/背景对比度按 WCAG AA 的普通文本目标设计。

## 4. Component 清单

| 分类 | 组件 | 数量 |
| --- | --- | ---: |
| 基础 | Button、IconButton、Badge、Chip、Tag、Divider、Tooltip、Avatar、Spinner、Skeleton | 10 |
| 布局 | Container、Section、Grid、Stack、Sidebar、PageHeader | 6 |
| SpiritVale | HeroBanner、SearchBar、ClassCard、GuideCard、BuildCard、BossCard、MonsterCard、DatabaseCard、FeatureSection、Breadcrumb、Pagination、FilterBar、EmptyState、SearchResultItem | 14 |
| 合计 | 独立可组合组件 | 30 |

Button、IconButton、Chip 与 Pagination 提供 default、hover、focus-visible、disabled、loading（适用时）交互状态；Badge 与 Tag 提供可表达的 disabled/loading 展示状态；Spinner 与 Skeleton 为专用加载状态组件。组件展示与数据获取解耦，不含业务逻辑。

## 5. Responsive 支持情况

采用 mobile-first CSS，断点与要求一致：

| 宽度 | 分组 | 行为 |
| ---: | --- | --- |
| 375px | Mobile | 单列默认结构与紧凑容器。 |
| 768px | Tablet | Grid 进阶为两列，Sidebar 变为 aside + content。 |
| 1024px | Desktop | Grid 进阶为三列，Section 使用扩展垂直节奏。 |
| 1280px | Desktop refinement | HeroBanner 使用宽屏内边距。 |
| 1440px | Desktop max | Container 受统一内容最大宽度限制。 |

## 6. TypeScript 检查结果

命令：

    npm run typecheck

结果：通过，tsc --noEmit 无错误。

## 7. ESLint 检查结果

命令：

    npm run lint

结果：通过，ESLint 无错误、无警告。

## 8. Playground 运行结果

命令：

    npm run build
    npm run playground

结果：

- 生产构建通过；Vite 转换 53 个模块并输出 dist-playground。
- Playground 在 127.0.0.1:5173 成功启动。
- 本机回环请求返回页面标题 SpiritVale Design System Playground。
- Playground 同时渲染全部基础、布局与 SpiritVale 专属组件；示例只使用展示文案和 imageAssetId，不读取或伪造游戏数据。

## 9. 已知限制

- imageAssetId 目前仅作为组件接口与 data-asset-id 元数据；实际的清单解析与图片 URL 解析应由后续应用层连接 SV-03 资产清单。
- 本 Sprint 没有创建任何业务路由或页面，符合范围限制。
- Light Mode 已完整提供 Token 映射；品牌在真实页面中的最终视觉微调应在 SV-06 结合正式内容进行。

## 10. 下一步建议

1. 在 SV-06 首页中以 DesignSystemProvider 包裹页面根节点，并从 data/assets/spiritvale-assets.json 解析 imageAssetId。
2. 使用 Container、Section、Grid、HeroBanner、ClassCard 与 GuideCard 组合首页，而不在页面内引入新色值或间距。
3. 在接入真实内容后进行断点视觉回归与键盘辅助功能检查。
