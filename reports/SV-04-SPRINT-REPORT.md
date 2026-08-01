# SV-04 SpiritVale Data Model Design 最终验收报告

## 1. 完成内容

- 建立 SpiritVale 第一版正式数据模型目录、13 个 JSON Schema、26 个正式数据文件、数据校验脚本和模型文档。
- Schema 全部使用 JSON Schema Draft 2020-12，包含 $schema、$id、additionalProperties: false、required 字段、类型、枚举、ID/slug 规则、URL 和日期格式规则。
- 建立 7 条最小真实基础职业记录：Acolyte、Mage、Summoner、Knight、Warrior、Scout、Rogue。
- 建立 5 条无正文的正式 Guide 基础记录：Beginner、Class、Leveling、Stats、Card System。
- 建立 2 条官方 Source 记录：SpiritVale Official Steam Store、SpiritVale Official Press Kit。
- 建立 version-unknown，明确保留未确认版本号和发布日期。
- 建立 14 个 Taxonomy 数据文件；仅 guide-types 含 5 条未验证站点分类候选值，其余保持空集合，不把候选分类绑定到游戏实体。
- 图片只通过 imageAssetIds 关联既有 SV-03 素材清单；没有新增或伪造图片路径。
- 创建 README 和 Mermaid 关系图，说明新增数据、来源、图片、未验证状态与页面生成方式。

## 2. 文件变更

新增：

- schemas/spiritvale/：13 个 Schema 文件。
- data/spiritvale/：12 个核心数据集合、14 个 Taxonomy 数据文件和 fixtures/README.md。
- scripts/validate-spiritvale-data.mjs。
- docs/spiritvale-data-model/README.md。
- docs/spiritvale-data-model/RELATIONSHIPS.md。
- reports/SV-04-SPRINT-REPORT.md。

修改：无。SV-03 素材清单与已有素材文件未修改。

删除：无。

## 3. 数据模型清单

| 模型 | Schema | 正式数据 | 状态 |
|---|---|---|---|
| Class | schemas/spiritvale/class.schema.json | data/spiritvale/classes/classes.json | 完成；7 条最小真实记录 |
| Build | schemas/spiritvale/build.schema.json | data/spiritvale/builds/builds.json | 完成；空集合，无假 Build |
| Skill | schemas/spiritvale/skill.schema.json | data/spiritvale/skills/skills.json | 完成；空集合 |
| Equipment | schemas/spiritvale/equipment.schema.json | data/spiritvale/equipment/equipment.json | 完成；空集合 |
| Card | schemas/spiritvale/card.schema.json | data/spiritvale/cards/cards.json | 完成；空集合 |
| Artifact | schemas/spiritvale/artifact.schema.json | data/spiritvale/artifacts/artifacts.json | 完成；空集合 |
| Boss | schemas/spiritvale/boss.schema.json | data/spiritvale/bosses/bosses.json | 完成；空集合 |
| Monster | schemas/spiritvale/monster.schema.json | data/spiritvale/monsters/monsters.json | 完成；空集合 |
| Map | schemas/spiritvale/map.schema.json | data/spiritvale/maps/maps.json | 完成；空集合 |
| Guide | schemas/spiritvale/guide.schema.json | data/spiritvale/guides/guides.json | 完成；5 条无正文基础记录 |
| Source | schemas/spiritvale/source.schema.json | data/spiritvale/sources/sources.json | 完成；2 条官方来源 |
| Taxonomy | schemas/spiritvale/taxonomy.schema.json | data/spiritvale/taxonomies/ | 完成；14 个集合 |
| GameVersion | schemas/spiritvale/game-version.schema.json | data/spiritvale/game-versions.json | 完成；version-unknown |

说明：GameVersion.status 使用任务要求的版本生命周期枚举 unknown、current、historical；其他正式实体使用编辑状态 draft、review、published、archived。

## 4. 正式数据统计

| 类别 | 记录数 |
|---|---:|
| Classes | 7 |
| Builds | 0 |
| Skills | 0 |
| Equipment | 0 |
| Cards | 0 |
| Artifacts | 0 |
| Bosses | 0 |
| Monsters | 0 |
| Maps | 0 |
| Guides | 5 |
| Sources | 2 |
| GameVersions | 1 |
| Taxonomy records | 5 |
| **正式记录合计** | **20** |

正式 JSON 数据文件数量：26。fixtures 目录中没有任何虚构游戏实体。

## 5. Schema 验证结果

验证命令：

    node scripts/validate-spiritvale-data.mjs

验证结果：

    SpiritVale data validation PASSED
    Schema files: 13
    Data files: 26
    Formal records: 20
    Duplicate IDs: 0
    Duplicate slugs: 0
    Invalid references: 0
    Invalid image asset IDs: 0
    Invalid source IDs: 0

失败数量：0。

校验器检查 Schema 版本和 strict 配置、required 字段、未知字段、枚举、类型、数组唯一项、ID/slug、ISO-8601 日期、HTTP(S) URL、跨实体关系、Taxonomy 关系、Source 关系、图片 Asset ID、状态一致性和 Build 测试条件。

附加复核：

    node scripts/validate-spiritvale-assets.mjs

既有素材校验继续通过：26 条素材记录、26 个唯一 raw 源文件、52 个图片文件均无错误。

## 6. 关系校验结果

| 项目 | 数量 |
|---|---:|
| ID 重复 | 0 |
| slug 重复 | 0 |
| 无效实体或 Taxonomy 引用 | 0 |
| 无效图片 ID | 0 |
| 无效 Source ID | 0 |

所有关系使用稳定 ID。当前 Guide 关联现有、已登记的攻略素材 Asset ID；七个职业 imageAssetIds 均为空，未引用不存在的职业图。

## 7. 已确认真实数据

- 七个职业名称和基础职业身份：来自 SpiritVale Official Steam Store，记录为 partially-verified，因为武器、属性、技能、进阶、难度和 Build 尚未确认。
- 官方来源身份、URL、所有者和访问时间：来自 SpiritVale Official Steam Store 与 SpiritVale Official Press Kit。
- Guide 的标题、slug 和 canonicalPath：仅为本站数据结构与路由壳，不包含游戏事实；因此保持 unverified，且无正文、无关系声明。
- Guide imageAssetIds：均指向 data/assets/spiritvale-assets.json 中已通过 SV-03 验证的真实素材 ID。

## 8. 未验证数据和空缺

- 职业：除 7 个名称与基础职业身份外，角色、武器、属性、技能、进阶、优缺点、玩法、难度、Build 和单职业图片均未确认。
- Skills、Equipment、Cards、Artifacts、Bosses、Monsters、Maps：均为 0 条；没有录入名称、数值、效果、掉落、地图、Boss 或怪物事实。
- SV-03 的 Lava Arena、Dungeon Arena、Ice Cavern、Mushroom Forest 仅是素材描述，未被写成 Boss 或 Map 实体。
- 图片：七职业独立主图、精准卡片/属性/升级界面仍缺失；所有 imageAssetIds 允许为空。
- 版本：仅有 version-unknown；versionNumber 和 releaseDate 均为 null。

## 9. 禁止项检查

| 检查项 | 结果 |
|---|---|
| 虚构游戏数据 | 否；未建立任何虚构技能、装备、Boss、怪物、地图或 Build |
| 抓取竞争站内容 | 否 |
| 创建假图片路径 | 否；图片仅以现有 asset ID 关联 |
| 修改既有素材 | 否 |
| 修改网页 | 否 |
| 生成文章 | 否 |
| 混入 fixtures 和正式数据 | 否 |
| 生成第二份 SV-04 验收报告 | 否 |

## 10. 下一步建议

1. 以官方资料或用户游戏内截图逐批补充技能、装备、卡片、Boss、怪物和地图，每个事实先建立 Source，再填实体与稳定 ID 关系。
2. 优先补拍七职业独立主图、卡片界面、属性分配界面和升级/Job 界面，并先登记到 SV-03 素材清单后再写入 imageAssetIds。
3. 在有可验证版本号和适用日期后，新增正式 GameVersion 记录；再将已核验实体从 version-unknown 迁移至该版本。
4. 仅在来源支持后填写 Class 的 roleIds、weaponTypeIds、statIds、skillIds、advancedClassIds 和 Build 关系。
5. 每次新增或修改数据后运行 node scripts/validate-spiritvale-data.mjs，再由后续页面生成器按 slug 和 ID 关系读取已验证字段。
