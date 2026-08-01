# SV-03 SpiritVale Asset Collection 最终验收报告

## 完成内容

- 已创建 `public/images/spiritvale/` 下要求的全部 22 个分类目录，以及 `data/assets/`。
- 已从两个一手官方渠道收集 26 个互不重复的真实素材源文件：
  - [SpiritVale 官方 Press Kit](https://impress.games/press-kit/baikun-interactive/spiritvale)
  - [SpiritVale 官方 Steam 商店页](https://store.steampowered.com/app/3767850/SpiritVale/)
- 已将 26 个官方源文件原样保存在 `public/images/spiritvale/raw/`，未覆盖原文件。
- 已按一张源图对应一张上线图的方式生成 26 张 WebP；仅等比缩小，没有拉伸、裁切或以重复裁切增加数量。
- 已完成 1 张以上 Logo、3 张 Hero 候选、5 张游戏场景，以及五类首发攻略共 10 张配图的数量目标。
- 已创建 JSON 素材清单，26 条记录均包含 `id`、`file`、`subject`、`category`、`sourceType`、`sourceUrl`、`sourceOwner`、`usage`、`alt`、`width`、`height`、`verified`、`notes`。
- 已创建缺口报告和自动验证脚本。
- 未使用 AI 生成图、Google 图片、竞争网站图片、YouTube 缩略图或 Steam Community 用户图片。
- 未开发网页、未生成文章、未修改任何现有页面。

## 文件变更

- `public/images/spiritvale/raw/`
  - 26 个官方源文件：18 个 Press Kit 源文件、8 个 Steam 商店源文件。
- `public/images/spiritvale/brand/`
  - 4 张 WebP：Wordmark、Icon、Box Art、Steam Overview。
- `public/images/spiritvale/hero/`
  - 3 张 WebP：主 Header、Meadow、Underwater。
- `public/images/spiritvale/gameplay/`
  - 5 张 WebP：Sanctum、Desert、Dungeon、Mine、Town。
- `public/images/spiritvale/bosses/`
  - 2 张 WebP：Lava Arena、Dungeon Arena；未虚构官方 Boss 名称。
- `public/images/spiritvale/maps/`
  - 2 张 WebP：Ice Cavern、Mushroom Forest；使用描述性生物群系名，未虚构官方地图名。
- `public/images/spiritvale/guides/`
  - `beginner/` 2 张、`classes/` 2 张、`leveling/` 2 张、`stats/` 2 张、`cards/` 2 张。
- `public/images/spiritvale/classes/*/`
  - 七职业目录已建立并保留 `.gitkeep`；未放入无法验证职业身份的图片。
- 其他暂未取得合规素材的目录
  - `monsters/`、`equipment/`、`cards/`、`artifacts/` 已建立并保留 `.gitkeep`。
- `data/assets/spiritvale-assets.json`
  - 26 条完整来源与使用登记。
- `scripts/validate-spiritvale-assets.mjs`
  - 素材自动检查脚本。
- `reports/SV-03-ASSET-GAPS.md`
  - 职业、攻略和用户补拍缺口清单。
- `reports/SV-03-SPRINT-REPORT.md`
  - 本最终验收报告；项目中仅此一份 SV-03 最终验收报告。

## 素材数量统计

| 分类 | 上线 WebP | raw 源文件对应数 |
|---|---:|---:|
| brand | 4 | 4 |
| hero | 3 | 3 |
| gameplay | 5 | 5 |
| bosses | 2 | 2 |
| maps | 2 | 2 |
| guides/beginner | 2 | 2 |
| guides/classes | 2 | 2 |
| guides/leveling | 2 | 2 |
| guides/stats | 2 | 2 |
| guides/cards | 2 | 2 |
| **合计** | **26** | **26** |

尺寸处理结果：

- Hero：最大宽度 1920px；3 张均符合。
- 内容图：最大宽度 1400px；所有游戏场景、Boss、地图和攻略内容图均符合。
- 品牌卡片和横幅：最大宽度 1000px；所有相关图片均符合。
- 全部上线图为 WebP；全部保持原始宽高比，没有错误裁切。

## 来源统计

| sourceType | 数量 | sourceOwner |
|---|---:|---|
| `official-press-kit` | 18 | Baikun Interactive |
| `official-steam` | 8 | Baikun Interactive |
| `official-news` | 0 | — |
| `self-captured` | 0 | — |
| `community-permission` | 0 | — |
| **合计** | **26** | |

来源链说明：官方 Steam 新闻曾公开链接到上述 Press Kit；实际清单为每张文件登记其 Press Kit CDN 或 Steam 官方静态资源 URL。无法确认来源的入库素材为 0 张。

## 验证命令与结果

执行命令：

```bash
node scripts/validate-spiritvale-assets.mjs
```

最终结果：

```text
SpiritVale asset validation PASSED
Manifest assets: 26
Unique raw sources: 26
All image files checked: 52
Source counts: {"official-press-kit":18,"official-steam":8}
Category counts: {"brand":4,"hero":3,"gameplay":5,"bosses":2,"maps":2,"guides/beginner":2,"guides/classes":2,"guides/leveling":2,"guides/stats":2,"guides/cards":2}
```

验证覆盖：

- JSON 中的 26 个文件全部存在。
- 26 张 WebP 均可读取有效 RIFF/WebP 图像结构，文件尺寸与 JSON 登记一致。
- 26 个 raw 源文件均通过对应 PNG、JPEG 或 AVIF 文件头与完整性检查。
- 52 个图片文件均非空。
- 52 个图片文件无重复 SHA-256 哈希。
- 每条记录使用一个唯一 raw 源文件，没有一图多裁重复计数。
- `sourceUrl` 和 `alt` 均非空。
- `verified` 字段均存在且为布尔值。
- `sourceType` 均在允许列表内。
- 文件命名、扩展名和最大宽度规则全部通过。
- 要求的全部分类目录均存在。

## 未完成项

- 七职业独立主图未完成：Acolyte、Mage、Summoner、Knight、Warrior、Scout、Rogue 均为 `MISSING_SELF_CAPTURE`。
- 原因：当前官方 Press Kit 与 Steam 商店素材没有提供可独立验证职业身份的单职业主图。通用 “Choose Your Class” 横幅不能拆分或冒充七张职业图。
- 五类首发攻略配图数量已完成，但精确主题仍有以下质量缺口：
  - Beginner：缺新手教程或任务引导界面。
  - Classes：缺七职业独立主图。
  - Leveling：缺经验条、升级提示或 Job 等级界面。
  - Stats：缺角色属性分配面板。
  - Cards：缺卡片背包、卡片详情和装备插卡界面。
- `monsters/`、`equipment/`、`cards/`、`artifacts/` 暂无独立上线素材；本轮最低目标未要求这些分类必须有图，因此仅建立目录，没有用错误分类填充。

详细缺口与补拍清单见 `reports/SV-03-ASSET-GAPS.md`。

## 下一步建议

1. 用户在游戏内补拍 12 张：七职业各 1 张，以及 Beginner、Leveling、Stats、Cards 专题共 5 张。
2. 补拍时使用游戏原生分辨率，隐藏聊天中的个人信息，不加第三方水印，不裁掉角色或关键 UI。
3. 补拍文件原样进入 `raw/`，上线版按现有尺寸规则转换为 WebP，并登记 `sourceType: self-captured`、游戏版本、拍摄日期与场景。
4. Cards 专题优先补拍卡片背包和装备插卡界面；Stats 专题优先补拍属性分配面板，以替换目前只能作为相关系统配图的通用构建/Refining 画面。
5. 新增素材后再次执行 `node scripts/validate-spiritvale-assets.mjs`，必须保持零重复哈希和一张上线图对应一个唯一源文件。

## 验收结论

SV-03 已完成 26 张真实官方素材的收集、raw 保留、WebP 优化、规范命名、来源登记、缺口报告和自动验证。素材总数、Logo、Hero、游戏场景、五类攻略配图及验证要求均已达到；七职业独立主图因官方素材不足，已按要求如实标记为 `MISSING_SELF_CAPTURE`，没有伪造或错误标记。当前交付可通过“官方素材不足时清楚说明缺口”的验收条件。
