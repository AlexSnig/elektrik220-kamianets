@echo off
chcp 65001 >nul
echo ========================================
echo   Підготовка до деплою на GitHub та Vercel
echo ========================================
echo.

cd /d "%~dp0"

echo [1/7] Перевірка git репозиторію...
git status >nul 2>&1
if errorlevel 1 (
    echo Git репозиторій не знайдено. Ініціалізація...
    git init
    git branch -M main
) else (
    echo Git репозиторій вже існує.
)
echo.

echo [2/7] Додавання файлів до git...
git add .
echo.

echo [3/7] Створення коміту...
git commit -m "Підготовка до деплою на Vercel"
echo.

echo [4/7] Налаштування віддаленого репозиторію...
echo.
echo Будь ласка, створіть новий репозиторій на GitHub:
echo 1. Перейдіть на https://github.com/new
echo 2. Назвіть репозиторій: elektrik220-kamianets
echo 3. НЕ додавайте README, .gitignore або ліцензію
echo 4. Скопіюйте URL репозиторію (наприклад: https://github.com/username/elektrik220-kamianets.git)
echo.
set /p REPO_URL="Вставте URL вашого GitHub репозиторію: "
echo.

echo [5/7] Додавання віддаленого репозиторію...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
echo.

echo [6/7] Відправка коду на GitHub...
git push -u origin main
echo.

echo [7/7] Інсталяція Vercel CLI (якщо потрібно)...
where vercel >nul 2>&1
if errorlevel 1 (
    echo Встановлення Vercel CLI...
    npm install -g vercel
) else (
    echo Vercel CLI вже встановлено.
)
echo.

echo ========================================
echo   GitHub репозиторій готовий!
echo ========================================
echo.
echo Тепер для деплою на Vercel:
echo.
echo ВАРІАНТ 1 - Через командний рядок:
echo   vercel
echo   (або "vercel --prod" для production деплою)
echo.
echo ВАРІАНТ 2 - Через веб-інтерфейс Vercel:
echo   1. Відкрийте https://vercel.com/new
echo   2. Імпортуйте ваш GitHub репозиторій
echo   3. Vercel автоматично визначить налаштування
echo   4. Натисніть Deploy
echo.
echo ========================================
pause
