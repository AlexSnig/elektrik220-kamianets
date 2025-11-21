# DevOps Автоматизація ⚙️

Документація по налаштованій DevOps інфраструктурі проєкту.

## 📑 Огляд

Проєкт використовує сучасний DevOps stack для автоматизації розробки, тестування та deploy.

---

## 🔧 Встановлені інструменти

### 1. **Husky + lint-staged**

Автоматична перевірка коду перед commit

**Що перевіряється:**

- ✅ ESLint - якість коду
- ✅ Prettier - форматування
- ✅ TypeScript - перевірка типів

**Конфігурація:**

- `.husky/pre-commit` - hook скрипт
- `package.json` → `lint-staged` - налаштування

**Як працює:**

```bash
git add .
git commit -m "feat: new feature"
# → Автоматично запускається lint-staged
# → Виправляє форматування
# → Перевіряє типи
# → Якщо все ОК - commit проходить
```

---

### 2. **GitHub Actions CI/CD**

Автоматичне тестування та перевірки при кожному push/PR.

#### Workflows:

**📄 `.github/workflows/ci.yml`**

Виконується на: `push`, `pull_request`

**Jobs:**

1. **quality-checks**
   - Type checking
   - Linting
   - Build verification
   - Bundle size analysis
   - Upload build artifacts

2. **lighthouse** (тільки PR)
   - Performance audit
   - Accessibility check
   - SEO analysis
   - Best practices

3. **security-audit**
   - npm audit
   - Outdated packages check

**📄 `.github/workflows/pr-checks.yml`**

Додаткові перевірки для Pull Requests:

- Bundle size report
- Code quality metrics
- Auto-labeling

**Приклад звіту:**

```
📦 Bundle Size Report

JavaScript Bundles:
- index-RlHwK9FG.js - 246 KB (62 KB gzipped)
- google-maps-qwsTvq8v.js - 219 KB (38 KB gzipped)
- react-vendor-pBn5inGn.js - 142 KB (45 KB gzipped)

Total: 912 KB
```

---

### 3. **Lighthouse CI**

Автоматична перевірка performance метрик.

**Конфігурація:** `.lighthouserc.json`

**Performance targets:**

- 🎯 Performance: >85%
- ♿ Accessibility: >90%
- 🔍 SEO: >90%
- ✨ Best Practices: >90%

**Metrics:**

- First Contentful Paint: <2s
- Largest Contentful Paint: <3s
- Cumulative Layout Shift: <0.1
- Total Blocking Time: <500ms
- Speed Index: <3.5s

**Результати:**

- Публікуються в PR коментарях
- Доступні в GitHub Actions artifacts
- Temporary public storage

---

### 4. **Dependabot**

Автоматичне оновлення залежностей.

**Конфігурація:** `.github/dependabot.yml`

**Налаштування:**

- 📅 Schedule: щотижня (понеділок, 9:00)
- 📦 Max PRs: 5 одночасно
- 🏷️ Auto labels: `dependencies`, `automated`
- 👤 Auto assign: AlexSnig

**Grouping:**

- Minor/Patch updates групуються разом
- Major updates - окремі PRs

**Що оновлює:**

- npm packages
- GitHub Actions

---

### 5. **Prettier**

Автоматичне форматування коду.

**Конфігурація:** `.prettierrc`

**Налаштування:**

- Single quotes
- Trailing commas
- 2 spaces indentation
- 100 char line width
- LF line endings

**Використання:**

```bash
# Автоматично при commit (через lint-staged)

# Або вручну:
npx prettier --write .
```

---

### 6. **Dynamic Sitemap Generation**

Автоматична генерація sitemap.xml з даних блогу.

**Скрипт:** `scripts/generate-sitemap.cjs`

**Як працює:**

1. Читає `public/data/blog.json`
2. Знаходить найновішу статтю
3. Генерує `public/sitemap.xml`
4. Оновлює `lastmod` для секції #blog

**Запуск:**

```bash
# Автоматично при npm run build (prebuild hook)

# Або вручну:
node scripts/generate-sitemap.cjs
```

---

## 🚀 Швидкий старт

### Локальна розробка

```bash
# 1. Clone repo
git clone https://github.com/AlexSnig/elektrik220-kamianets.git

# 2. Install dependencies
npm install

# 3. Запустити dev
npm run dev
```

### Перший commit

```bash
# 1. Зробити зміни
git add .

# 2. Commit (автоматично запуститься lint-staged)
git commit -m "feat: your feature"

# 3. Push
git push
```

### Створення PR

```bash
# 1. Створити feature branch
git checkout -b feature/new-feature

# 2. Зробити зміни та commit
git commit -m "feat: new feature"

# 3. Push
git push -u origin feature/new-feature

# 4. Відкрити PR на GitHub
# → Автоматично запуститься CI/CD
# → Lighthouse audit
# → Bundle size check
# → Code quality checks
```

---

## 📊 Metrics & Monitoring

### GitHub Actions

**Де переглянути:**

1. Repository → Actions tab
2. Вибрати workflow run
3. Переглянути jobs та logs

**Artifacts:**

- Build output (7 днів retention)
- Lighthouse reports
- Bundle size reports

### Lighthouse

**Де переглянути:**

1. PR → Checks tab
2. "Lighthouse Performance Check"
3. Відкрити temporary public storage link

### Bundle Size

**Де переглянути:**

1. PR → Checks tab
2. "Bundle Size Check" job
3. Розгорнути "Check bundle size" step

---

## 🔐 Secrets

Потрібні GitHub Secrets для CI/CD:

```
VITE_GOOGLE_MAPS_API_KEY - Google Maps API ключ
LHCI_GITHUB_APP_TOKEN - Lighthouse CI токен (опціонально)
```

**Як додати:**

1. Repository → Settings
2. Secrets and variables → Actions
3. New repository secret

---

## 🛠️ Налаштування IDE

### VS Code

Рекомендовані розширення:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss"
  ]
}
```

**Settings:**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## 📈 Performance Optimizations

Впроваджені оптимізації:

✅ **Font Loading**

- Preconnect to fonts.googleapis.com
- Preload critical fonts
- Async font loading

✅ **Code Splitting**

- Lazy loading для CostCalculator
- Lazy loading для ContactSection (Google Maps)
- Lazy loading для всіх секцій

✅ **Animations**

- Тільки GPU-accelerated properties
- Видалено wildcard selector transitions
- Strategic will-change usage

✅ **Bundle Optimization**

- Main bundle: 246 KB (62 KB gzipped)
- Google Maps lazy loaded: 219 KB
- Vite automatic code splitting

---

## 🔄 Continuous Improvement

Автоматичні перевірки допомагають підтримувати:

- 📊 Bundle size під контролем
- 🚀 Performance metrics
- ♿ Accessibility standards
- 🔒 Security vulnerabilities
- 📦 Up-to-date dependencies

**Результат:**

- Faster development
- Fewer bugs in production
- Better code quality
- Automated best practices

---

## 📚 Додаткові ресурси

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Husky](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/okonet/lint-staged)
- [Dependabot](https://docs.github.com/en/code-security/dependabot)

---

**Питання?** Створіть issue або зв'яжіться з командою! 💬
