# Інструкція для розробників 🚀

Цей документ описує процес розробки та DevOps автоматизацію проєкту.

## 📋 Зміст

- [Швидкий старт](#швидкий-старт)
- [Доступні команди](#доступні-команди)
- [Git Workflow](#git-workflow)
- [Pre-commit Hooks](#pre-commit-hooks)
- [CI/CD Pipeline](#cicd-pipeline)
- [Code Quality](#code-quality)

---

## 🚀 Швидкий старт

```bash
# Встановити залежності
npm install

# Запустити dev сервер
npm run dev

# Зробити production build
npm run build

# Попередній перегляд production build
npm run preview
```

---

## 📦 Доступні команди

### Development

```bash
npm run dev              # Запустити dev сервер з hot reload
npm run typecheck:watch  # TypeScript перевірка в режимі watch
```

### Build & Deploy

```bash
npm run prebuild         # Автоматична генерація sitemap.xml
npm run build            # Production build з оптимізацією
npm run preview          # Локальний preview production build
```

### Code Quality

```bash
npm run lint             # Перевірка коду з ESLint
npm run lint:fix         # Автоматичне виправлення ESLint помилок
npm run typecheck        # TypeScript перевірка типів
npm run clean            # Очистити dist та кеш
```

---

## 🔄 Git Workflow

### Створення нової feature

```bash
# 1. Створіть нову гілку від main
git checkout -b feature/your-feature-name

# 2. Зробіть зміни та додайте файли
git add .

# 3. Commit (запуститься pre-commit hook автоматично)
git commit -m "feat: опис вашої зміни"

# 4. Push змін
git push -u origin feature/your-feature-name

# 5. Створіть Pull Request на GitHub
```

### Conventional Commits

Використовуємо [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - нова функціональність
- `fix:` - виправлення бага
- `perf:` - покращення продуктивності
- `refactor:` - рефакторинг коду
- `style:` - зміни в стилях
- `docs:` - зміни в документації
- `test:` - додавання/виправлення тестів
- `chore:` - технічні зміни (build, CI/CD)
- `security:` - security improvements

**Приклади:**

```bash
git commit -m "feat: додано калькулятор вартості послуг"
git commit -m "fix: виправлено помилку в ContactSection"
git commit -m "perf: оптимізовано завантаження шрифтів"
git commit -m "security: додано CSP headers"
```

---

## 🎯 Pre-commit Hooks

При кожному `git commit` автоматично запускаються:

✅ **ESLint** - перевірка та автофікс коду
✅ **Prettier** - форматування коду
✅ **TypeScript** - перевірка типів

### Якщо pre-commit hook блокує commit:

```bash
# Подивитись які файли мають помилки
git status

# Виправити ESLint помилки автоматично
npm run lint:fix

# Перевірити TypeScript
npm run typecheck

# Спробувати commit знову
git commit -m "your message"
```

### Обхід hooks (НЕ рекомендується!)

```bash
# Тільки для екстрених випадків
git commit --no-verify -m "emergency fix"
```

---

## 🔁 CI/CD Pipeline

### Що автоматично виконується при Push/PR:

#### 1. **Quality Checks** (на всіх гілках)

- ✅ Type check
- ✅ Lint check
- ✅ Build verification
- ✅ Bundle size analysis
- 📦 Build artifacts upload

#### 2. **Lighthouse CI** (тільки для PR)

- 🚀 Performance audit (target: >85%)
- ♿ Accessibility audit (target: >90%)
- 🔍 SEO audit (target: >90%)
- ✨ Best practices audit (target: >90%)

#### 3. **Security Audit**

- 🔒 npm audit
- 📦 Outdated packages check

#### 4. **PR Checks** (тільки для PR)

- 📊 Bundle size report
- 🏷️ Auto-labeling
- 📝 Code quality metrics

### Перегляд результатів CI/CD

1. Відкрийте PR на GitHub
2. Перейдіть в таб "Checks"
3. Побачите детальні результати всіх перевірок
4. Lighthouse звіт буде доступний в коментарях PR

---

## ✨ Code Quality Standards

### TypeScript

- Всі нові файли мають бути `.ts` або `.tsx`
- Уникайте `any` типів
- Використовуйте strict mode

### React

- Функціональні компоненти + hooks
- TypeScript interfaces для props
- Мемоізація важких компонентів (`React.memo`, `useMemo`)

### Performance

- Lazy loading для важких компонентів
- Code splitting
- Оптимізація images
- GPU-accelerated animations тільки

### Accessibility

- Semantic HTML
- ARIA labels де потрібно
- Keyboard navigation
- Screen reader friendly

---

## 🔧 Автоматизації

### Dependabot

Автоматично створює PR для оновлення залежностей:

- 📅 Щотижня (понеділок, 9:00)
- 📦 Групує minor/patch оновлення
- 🏷️ Автоматично додає labels
- 👤 Призначає reviewers

### Dynamic Sitemap

При кожному build автоматично:

- 📄 Генерується `sitemap.xml`
- 📅 Оновлюється дата блогу на основі найновішої статті
- 🔄 Синхронізується з `blog.json`

---

## 🐛 Troubleshooting

### Build fails

```bash
# Очистити кеш та перебудувати
npm run clean
npm install
npm run build
```

### Husky hooks not working

```bash
# Переініціалізувати husky
npm run prepare
```

### TypeScript errors

```bash
# Перевірити всі помилки
npm run typecheck

# Відслідковувати помилки в реальному часі
npm run typecheck:watch
```

---

## 📚 Додаткові ресурси

- [Vite Documentation](https://vitejs.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Lighthouse Performance](https://web.dev/performance-scoring/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Потрібна допомога?** Створіть issue на GitHub або зв'яжіться з командою! 💬
