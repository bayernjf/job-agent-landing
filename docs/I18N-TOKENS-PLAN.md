# i18n 与设计 token 对齐方案 — job-agent-landing

状态：**待评审**（2026-09-10）
范围：接入 i18n（en 默认 + `/zh`）、把 design token 收敛到 `@bay/landing-ui`
参考实现：[`bayernjf/work-learn-landing`](https://github.com/bayernjf/work-learn-landing)（同系列已落地的双语落地页）

## 已决策

| 决策 | 结论 | 日期 |
|---|---|---|
| 默认语言 | **根路径 `/` 为英文，中文放 `/zh/`**；与同系列 `*-landing` 一致 | 2026-09-10 |
| 文案流程 | **先英文后中文**：英文作为源语言定稿，中文由英文产出；不把现有中文当源语言回译成英文 | 2026-09-10 |
| 语言切换 | **本站内联实现**，不改 `landing-ui`；与 work-learn-landing 的 Nav 做法一致 | 2026-09-10 |

## 1. 背景

`AGENTS.md:7` 写明本项目「简体中文，无 i18n」。但同系列 `*-landing` 站点（work-learn / termana / agent-world / one-world / word-picker / tab-manager 等）已统一为**英文默认 + `/zh` 子路径**，本站是唯一的单语例外。

设计 token 则是**导入了但没真正用起来**：`global.css:1` 引入了 `@bay/landing-ui/styles/tokens.css` 并覆盖了 6 个 `--lui-*` 变量，但站点自身样式消费的全是另一套本地变量，`--lui-*` 实际只被 `BayjfLink` / `StarOnGithub` 两个共享组件用到。

## 2. 现状问题清单

### i18n

| 位置 | 问题 |
|---|---|
| `astro.config.mjs` | 只有 `site` + `output`，无 `i18n` 配置，无 `@astrojs/sitemap` |
| `src/layouts/Layout.astro:19` | `<html lang="zh-CN">` 硬编码 |
| `src/layouts/Layout.astro:13-14` | title / description 中文硬编码在默认值里 |
| `src/layouts/Layout.astro:30` | og:image 写死 `preview-zh.png` |
| 7 个组件 | 文案全部内联硬编码（Hero / Problem / Solution / Moat / Roadmap / Demo / Nav） |
| `public/` | 缺 `llms.txt` / `llms-en.txt` / `robots.txt` |

### Design token

| 位置 | 问题 |
|---|---|
| `global.css:14-31` | 另起一套 15 个本地 token（`--bg --surface --ink --ink-2 --ink-3 --brand --brand-dark --brand-soft --teal --teal-soft --amber --amber-soft --border --radius --shadow --maxw --font`），与 `--lui-*` 并行 |
| `global.css:28,29,31` | `--radius`(14px) / `--shadow` / `--font` 未映射到已有的 `--lui-radius-lg` / `--lui-shadow-lg` / `--lui-font-sans` |
| `global.css:50,67,154` | `.eyebrow` / `.card` / `.btn-ghost` 与 landing-ui 的 `.lui-eyebrow` / `.lui-card` / `.lui-btn-ghost` 功能重复 |
| 全站约 50 处 | 硬编码 hex，违反 `AGENTS.md:38`。集中在 `global.css` 的 `.roadmap` / `.rc-*` / `.lane-*` / `.bar`，以及 `Hero.astro:8,32`、`Problem.astro:29`、`Roadmap.astro:3`、`Demo.astro:36-62` |

**边界说明**：landing-ui 的 `tokens.css` 只提供 font / radius / shadow / motion / accent / surface / border，**不包含文本语义色**（ink / muted）。因此 `--ink*` 属于合理的站点扩展，目标是「集中登记 + 消除硬编码」，而不是把它消灭。

### 附带 bug

- `src/layouts/Layout.astro:24`：`theme-color` 为 `#0b1220`（暗色），与站点浅色主题不符，移动端地址栏会染错色。

## 3. 目标形态

```js
// astro.config.mjs
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'zh'],
  routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
},
integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { zh: 'zh-CN', en: 'en-US' } } })],
```

```
src/i18n/ui.ts        en + zh 文案表（defaultLang = 'en'）
src/i18n/index.ts     t() / getLangFromUrl() / localizePath() / getAltLangPath()
                      / getOtherLang() / getHrefLangUrl()
src/pages/index.astro       英文（默认语言，根路径）
src/pages/zh/index.astro    中文
```

- 组件通过 `t(key)` 取文案，不再内联
- `Layout.astro`：`lang` 动态化、补 `<link rel="alternate" hreflang>`、og:image 按语言取 `preview-en.png` / `preview-zh.png`
- `Nav.astro` 加语言切换入口（landing-ui v1.5.0 **没有** LangSwitch 组件，需本站实现）
- `public/` 补 `llms.txt` / `llms-en.txt` / `robots.txt`

## 4. 实施阶段

每个阶段结束都能独立构建、独立上线、独立回滚。

### P0 — 修 theme-color（可直接做）
`Layout.astro:24` 的 `#0b1220` 改为站点浅色表面值。

### P1 — 抽文案，不改路由（无视觉变化）
建 `src/i18n/ui.ts`（先只装 zh）+ `index.ts`，把 7 个组件和 Layout 的内联文案换成 `t('...')`。
此时站点行为、URL、外观完全不变，纯粹是结构重构，风险最低。

### P2 — 补英文 + 上双语路由
1. **先出英文**：全部文案以英文定稿写入 `ui.ts`（源语言），再由英文产出中文
2. `index.astro` 迁到英文并新建 `pages/zh/index.astro`
3. `astro.config.mjs` 加 `i18n` + `@astrojs/sitemap`
4. `Layout.astro` 动态 `lang` / hreflang / 分语言 og:image
5. `Nav.astro` 加语言切换
6. `public/` 补 `llms.txt` / `llms-en.txt` / `robots.txt`

### P3 — token 收敛
1. `--radius` / `--shadow` / `--font` 改为引用 `--lui-radius-lg` / `--lui-shadow-lg` / `--lui-font-sans`
2. 50 处硬编码 hex 逐类替换为语义 token；缺失的补进 `:root`
3. 评估 `.card` / `.eyebrow` 是否改用 `.lui-*` 原语（有视觉差异，见 §7）

### P4 — 文档同步
`AGENTS.md`（单语 → 双语、token 约定）、`README.md`（技术栈 / 页面结构 / 目录结构）、`handoff.md`、`docs/DEPLOYMENT.md`（预览图不再「两张相同」）。

## 5. 提交切分

遵循 `git-commit-message.md`：英文 Conventional Commits，按文件类型与业务模块拆原子提交，不合并无关改动。预计：

```
fix: correct theme-color for light theme                    (P0)
refactor(i18n): extract copy into ui.ts without route change (P1)
feat(i18n): add english copy                                 (P2)
feat(i18n): add zh route and locale-aware layout             (P2)
feat(i18n): add language switch to nav                       (P2)
chore(config): enable astro i18n routing and sitemap         (P2)
docs: add llms.txt, llms-en.txt and robots.txt               (P2)
style(tokens): map site tokens onto landing-ui primitives    (P3)
style(tokens): replace hardcoded hex values with tokens      (P3)
docs: update project docs for bilingual site                 (P4)
```

## 6. 验收清单

- [ ] `/` 为英文，`/zh/` 为中文，两侧六个章节与 Demo 表单均正常
- [ ] 语言切换在任意页面都能跳到对端语言的同位置
- [ ] `<html lang>` 与 hreflang 正确，sitemap 含双语条目
- [ ] `dist/preview-en.png` 与 `dist/preview-zh.png` 内容不同，og:image 各语言指向正确
- [ ] `npm run build` 通过（含 Playwright 截图）
- [ ] `src/` 内无硬编码 hex（favicon / logo 的 SVG 渐变除外）
- [ ] Cloudflare Pages preview 部署双语页面可访问

## 7. 开放问题（需确认后再动 P2 / P3）

1. ~~**默认语言是否真的改 en？**~~ ✅ 已决策：根路径 `/` 为英文，中文放 `/zh/`（见「已决策」）。
   影响：现有中文内容整体迁到 `/zh/`，根路径的搜索引擎索引与 og 会重建一次。
2. **token 对齐的视觉微调是否接受？** `--radius` 14px 对齐到 `--lui-radius-lg`(16px) 会带来轻微圆角变化。（阻塞 P3）
3. ~~**LangSwitch 放哪？**~~ ✅ 已决策：本站内联实现，不往 `landing-ui` 提组件（见「已决策」）。
4. **英文文案由谁起草？** 已定「先英文后中文」的流程，但源文案的产出方未定：由 agent 依据 `job-agent` 产品 PRD 起草再交你审，还是你直接给？（阻塞 P2 第 1 步）
5. **是否需要重定向规则？** 是否要按 `Accept-Language` 自动跳转，或为旧中文 URL 配 `_redirects`？
