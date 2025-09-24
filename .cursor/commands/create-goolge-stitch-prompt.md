---
title: create-goolge-stitch-prompt
description: Google Stitch 用のプロンプトを作成する
reference data: https://www.youtube.com/watch?v=51tBZJtgSIA
---

以下の1、2を実行してください。

1. 以下の modular-design-prompt.md の USER_INPUT を埋めて完成させたいです。以下のルールに従ってください。
   - USER_INPUT:の部分を 1 問づつ私に質問して、私の返答で USER_INPUT:の部分を埋めてください。
   - 事前に USER_INPUT:の部分を指定した場合は、その部分を埋めてください。
   - USER_INPUT:の質問の残り回数（例：1/3）がわかるように表示してください。
   - 日本語で答えますが、出力は英語に訳してください。
   - マークダウンファイルに出力してください。
2. USER_INPUT を埋めた modular-design-prompt.md から、Goolge Stitch 用のプロンプトを作成してください。

```markdown:modular-design-prompt.md
# AI Studio Prompt

Create a modular design backbone skeleton for my app called: [USER_INPUT: APP_NAME]

## Theme Colors(Hex Code)

- Primary: [USER_INPUT: COLOR_1]
- Secondary: [USER_INPUT: COLOR_2]
- Tertiary: [USER_INPUT: COLOR_3]

## Requirements

### 1. Core Layout

- Main content area: [USER_INPUT: What kind of content/cards/sections?]
- Footer: [USER_INPUT: What links/info to include?]
- Example components: [USER_INPUT: Which components do you need most? e.g., buttons, forms, modals]

### 2. Onboarding Flow

- Welcome screen: [USER_INPUT: What message or visuals should greet the user?]
- Questionnaire: [USER_INPUT: What is the questionnaire about? (e.g., healthcare, fitness, finance, learning goals)]
- Progress indicator: [USER_INPUT: Do you want a progress bar, steps, or percentage?]
- Summary screen: [USER_INPUT: What should the summary show? (e.g., recommended plan, setup overview)]

### 3. Conversion Funnel (Paywall)

- Pricing tiers: [USER_INPUT: How many tiers? What are they called?]
- CTA button: [USER_INPUT: What's the main action? e.g., "Subscribe Now", "Start Free Trial"]
- Trust elements: [USER_INPUT: What reassurance to show? e.g., free trial, money-back guarantee, testimonials]

### 4. Custom Features

- [USER_INPUT: List any extra screens or unique ideas you want]

## Design Principles

- Wireframe placeholders (not final visuals).
- Modular, scalable, adaptive for web + mobile.
```
