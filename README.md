# JobAgent — Landing

AI 时代的招聘新范式：简历会说谎，代码不会。JobAgent 把 GitHub 仓库分析成**可验证的能力画像**，让企业招到真正做过的人，让求职者用作品证明自己。

- 线上：https://job-agent.bayjf.com （Cloudflare Pages）
- 产品仓库：https://github.com/bayernjf/job-agent
- 当前状态：产品构想讨论稿 · 开发中 · 落地页已上线

## 技术栈

- [Astro 5](https://astro.build) 静态站点，`output: 'static'`
- 原生 CSS，design token 集中在 `src/styles/global.css` 的 `:root` 变量
- 简体中文单语（`lang="zh-CN"`），无 i18n、无 React island
- Demo 区原生 JS：GitHub 用户名内测预约，记录保存在浏览器 `localStorage`（key：`jobagent_waitlist`）
- 构建时用 Playwright 无头浏览器截图生成预览图 / og:image（`scripts/shot.mjs`）

## 本地开发

需要 Node 18.17+（本机 v22 已验证）。

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build     # astro build && node scripts/shot.mjs
npm run preview   # 预览 dist
```

`npm run build` 在 `astro build` 之后会跑 `scripts/shot.mjs`：在 `dist/` 上起静态服务，用 Playwright 截取首屏，产出 `dist/preview-zh.png` 与 `dist/preview-en.png` 作为 og:image（预览图不入库，每次构建现生成）。首次构建前装一次浏览器内核：

```bash
npx playwright install chromium
```

## 页面结构

单页 `src/pages/index.astro`，按顺序渲染六个章节：

| 章节 | 组件 | 内容 |
|------|------|------|
| 首屏 | `Hero.astro` | 主标语 + GitHub 能力画像示意卡片 |
| 理念 · 问题 | `Problem.astro` | 传统招聘链路失效的四个问题 |
| 方案 · 双向闭环 | `Solution.astro` | B 端招聘 / C 端应聘 / 反馈闭环 |
| 护城河 · 验证引擎 | `Moat.astro` | AI 仓库识别 / 行为模式分析 / 协作信号核验 |
| 路线 · 已决策 | `Roadmap.astro` | 目标用户、商业模式、市场地域三大方向 |
| 内测预约 | `Demo.astro` | GitHub 用户名内测预约（localStorage） |

## 目录结构

```
public/            favicon.svg
scripts/shot.mjs   构建后截取预览图 / og:image
src/layouts/       Layout.astro（head + og meta、导航、页脚）
src/components/    Nav、Hero、Problem、Solution、Moat、Roadmap、Demo
src/pages/         index.astro
src/styles/        global.css（design token + 全站样式）
```

## 部署

已部署到 Cloudflare Pages（Git 集成，push main 自动构建发布）。配置与验证细节见 `docs/DEPLOYMENT.md`。
