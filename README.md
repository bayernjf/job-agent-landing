# JobAgent — Landing

AI 时代的招聘新范式：简历会说谎，代码不会。JobAgent 把 GitHub 仓库分析成**可验证的能力画像**，让企业招到真正做过的人，让求职者用作品证明自己。

- 产品仓库：https://github.com/bayernjf/job-agent
- 当前状态：产品构想讨论稿 · 开发中 · **尚未部署**（线上地址待上线后补充）

## 技术栈

- [Astro 5](https://astro.build) 静态站点，`output: 'static'`
- 原生 CSS，design token 集中在 `src/styles/global.css` 的 `:root` 变量
- 简体中文单语（`lang="zh-CN"`），无 i18n、无 React island
- Demo 区原生 JS：GitHub 用户名内测预约，记录保存在浏览器 `localStorage`（key：`jobagent_waitlist`）

## 本地开发

需要 Node 18.17+（本机 v22 已验证）。

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview   # 预览 dist
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
src/layouts/       Layout.astro（head、导航、页脚）
src/components/    Nav、Hero、Problem、Solution、Moat、Roadmap、Demo
src/pages/         index.astro
src/styles/        global.css（design token + 全站样式）
```

## 部署

**尚未部署**。`astro.config.mjs` 的 `site` 为占位域名 `https://jobagent.example.com`，上线时替换为真实域名，并同步 `public/robots.txt`（如引入）与页面 meta。部署方案细节见 `docs/DEPLOYMENT.md`。
