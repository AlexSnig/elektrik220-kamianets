import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, FileText, Mail, Phone, ArrowLeft } from 'lucide-react';
import { useApp } from '../hooks/use-app';

const PrivacyPolicy: React.FC = () => {
  const { state } = useApp();
  const companyData = state.companyData;
  const contact = companyData?.contact;
  const companyName = companyData?.company?.name ?? 'Електрик 220В';
  const email = contact?.email ?? 'info@elektrik220.km.ua';
  const phone = contact?.phones?.find(p => p.primary)?.number ?? '+380 97 123 45 67';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: FileText,
      title: '1. Загальні положення',
      content: [
        `Ця Політика конфіденційності визначає порядок обробки та захисту персональних даних користувачів веб-сайту ${companyName} (далі - "Сайт"), розташованого за адресою elektrik220.km.ua.`,
        `Використовуючи Сайт, ви погоджуєтеся з умовами цієї Політики конфіденційності. Якщо ви не згодні з умовами, будь ласка, не використовуйте Сайт.`,
        `Адміністратором персональних даних є ${companyName}, зареєстрований в Україні.`,
        'Ця Політика розроблена відповідно до вимог Закону України "Про захист персональних даних" від 01.06.2010 № 2297-VI та інших нормативно-правових актів України.',
      ],
    },
    {
      icon: Eye,
      title: '2. Які персональні дані ми збираємо',
      content: [
        'Ми можемо збирати наступні категорії персональних даних:',
        "• Ім'я та прізвище",
        '• Номер телефону',
        '• Адреса електронної пошти (за бажанням)',
        "• Адреса об'єкта, де потрібні електромонтажні роботи",
        '• Опис проблеми або запиту на послугу',
        '• Технічна інформація: IP-адреса, тип браузера, операційна система, час відвідування',
        '• Cookies та інші технології відстеження для покращення роботи Сайту',
      ],
    },
    {
      icon: Lock,
      title: '3. Мета збору та обробки персональних даних',
      content: [
        'Ми збираємо та обробляємо ваші персональні дані виключно для наступних цілей:',
        "• Надання електромонтажних послуг та виконання договірних зобов'язань",
        "• Зв'язок з вами для уточнення деталей замовлення",
        '• Відправка комерційних пропозицій та інформації про акції (тільки за вашою згодою)',
        '• Покращення якості наших послуг та функціоналу Сайту',
        '• Аналіз відвідуваності та поведінки користувачів на Сайті',
        '• Виконання вимог законодавства України',
        'Ми не використовуємо ваші дані для автоматизованого прийняття рішень або профілювання.',
      ],
    },
    {
      icon: Shield,
      title: '4. Правова підстава обробки даних',
      content: [
        'Обробка ваших персональних даних здійснюється на наступних правових підставах:',
        '• Ваша добровільна згода, надана при заповненні форм на Сайті',
        '• Необхідність виконання договору на надання електромонтажних послуг',
        '• Виконання законних вимог, передбачених законодавством України',
        "Ви маєте право відкликати свою згоду в будь-який момент, зв'язавшись з нами.",
      ],
    },
    {
      icon: Lock,
      title: '5. Захист персональних даних',
      content: [
        'Ми вживаємо всіх необхідних організаційних та технічних заходів для захисту ваших персональних даних:',
        '• Використання шифрування даних при передачі (HTTPS)',
        '• Обмеження доступу до персональних даних лише уповноваженим співробітникам',
        '• Регулярне оновлення систем безпеки',
        '• Зберігання даних на захищених серверах',
        '• Контроль за дотриманням вимог законодавства про захист персональних даних',
        'Проте, зверніть увагу, що жоден метод передачі даних через Інтернет або метод електронного зберігання не є абсолютно безпечним.',
      ],
    },
    {
      icon: FileText,
      title: '6. Ваші права щодо персональних даних',
      content: [
        'Відповідно до Закону України "Про захист персональних даних", ви маєте наступні права:',
        '• Право знати про джерела збирання, місцезнаходження своїх персональних даних',
        '• Право отримувати інформацію про умови надання доступу до персональних даних',
        '• Право на доступ до своїх персональних даних',
        '• Право на виправлення неточних або неповних персональних даних',
        '• Право на видалення своїх персональних даних',
        '• Право на обмеження обробки персональних даних',
        '• Право на відкликання згоди на обробку персональних даних',
        '• Право на подання скарги до Уповноваженого Верховної Ради України з прав людини',
        `Для реалізації своїх прав зв'яжіться з нами за телефоном ${phone} або електронною поштою ${email}.`,
      ],
    },
    {
      icon: Eye,
      title: '7. Передача даних третім особам',
      content: [
        'Ми не продаємо, не обмінюємо та не передаємо ваші персональні дані третім особам, за винятком наступних випадків:',
        '• Надання послуг постачальниками, які допомагають нам у роботі Сайту (хостинг, аналітика)',
        '• Виконання вимог законодавства за запитами уповноважених органів',
        '• Захист наших прав та власності',
        "Всі треті сторони зобов'язані дотримуватися конфіденційності ваших даних відповідно до законодавства України.",
      ],
    },
    {
      icon: FileText,
      title: '8. Cookies та технології відстеження',
      content: [
        'Наш Сайт використовує cookies - невеликі текстові файли, які зберігаються на вашому пристрої для покращення роботи Сайту.',
        'Типи cookies, які ми використовуємо:',
        '• Технічні cookies - необхідні для функціонування Сайту',
        '• Аналітичні cookies - для аналізу відвідуваності (можливо, Google Analytics)',
        "• Функціональні cookies - для запам'ятовування ваших налаштувань",
        'Ви можете налаштувати свій браузер для відмови від cookies або отримання сповіщень про їх встановлення. Проте, це може вплинути на функціональність Сайту.',
      ],
    },
    {
      icon: Eye,
      title: '9. Google Maps та інші сторонні сервіси',
      content: [
        'Наш Сайт використовує Google Maps для відображення карти та маршрутів. При використанні Google Maps можуть збиратися дані відповідно до Політики конфіденційності Google.',
        'Ми не контролюємо збір та обробку даних сторонніми сервісами. Рекомендуємо ознайомитися з політикою конфіденційності цих сервісів:',
        '• Google Privacy Policy: https://policies.google.com/privacy',
        'Використання Сайту означає вашу згоду з політиками конфіденційності цих сторонніх сервісів.',
      ],
    },
    {
      icon: Lock,
      title: '10. Термін зберігання персональних даних',
      content: [
        'Ми зберігаємо ваші персональні дані лише протягом часу, необхідного для досягнення цілей, для яких вони були зібрані:',
        "• Дані замовлень - протягом 3 років після завершення робіт (для виконання гарантійних зобов'язань)",
        '• Дані для маркетингових розсилок - до відкликання згоди',
        '• Технічні логи - до 12 місяців',
        'Після закінчення терміну зберігання персональні дані видаляються або знеособлюються.',
      ],
    },
    {
      icon: Shield,
      title: '11. Права неповнолітніх',
      content: [
        'Наш Сайт не призначений для осіб віком до 18 років. Ми свідомо не збираємо персональні дані від неповнолітніх.',
        "Якщо ви є батьком або опікуном і знаєте, що ваша дитина надала нам персональні дані без вашої згоди, зв'яжіться з нами, і ми видалимо ці дані.",
      ],
    },
    {
      icon: FileText,
      title: '12. Зміни в Політиці конфіденційності',
      content: [
        'Ми залишаємо за собою право вносити зміни до цієї Політики конфіденційності в будь-який час.',
        'Дата останнього оновлення вказана в кінці документа. Будь-які зміни набувають чинності з моменту їх публікації на Сайті.',
        'Ми рекомендуємо регулярно переглядати цю Політику для того, щоб бути в курсі того, як ми захищаємо вашу інформацію.',
        'Істотні зміни будуть повідомлятися додатково через Сайт або електронну пошту.',
      ],
    },
    {
      icon: Mail,
      title: '13. Контактна інформація',
      content: [
        "Якщо у вас є запитання щодо цієї Політики конфіденційності або ви бажаєте реалізувати свої права, зв'яжіться з нами:",
        `${companyName}`,
        `${contact?.address?.city ?? "м. Кам'янець-Подільський"}, ${contact?.address?.street ?? 'Україна'}`,
        `Телефон: ${phone}`,
        `Email: ${email}`,
        'Ми відповімо на ваш запит протягом 30 календарних днів.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-white/90 hover:text-white mb-6 transition-colors group"
            aria-label="Повернутися на головну сторінку"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Повернутися на головну</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Політика конфіденційності
              </h1>
            </div>
            <p className="text-lg text-blue-100 max-w-3xl">
              Захист ваших персональних даних є нашим пріоритетом. Ця політика описує, як ми
              збираємо, використовуємо та захищаємо вашу інформацію відповідно до законодавства
              України.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Important Notice */}
          <motion.div
            className="mb-12 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Важлива інформація</h3>
                <p className="text-gray-700">
                  Ця Політика конфіденційності розроблена відповідно до Закону України &quot;Про
                  захист персональних даних&quot; (№ 2297-VI від 01.06.2010). Використовуючи наш
                  Сайт, ви підтверджуєте свою згоду з умовами обробки персональних даних,
                  викладеними нижче.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.section
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 sm:p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 pt-2">{section.title}</h2>
                </div>
                <div className="ml-16 space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={`text-gray-700 leading-relaxed ${
                        paragraph.startsWith('•') ? 'ml-4' : ''
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Last Updated */}
          <motion.div
            className="mt-12 p-6 bg-gray-100 rounded-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-600 text-center">
              <strong>Дата останнього оновлення:</strong> 30 листопада 2025 року
            </p>
            <p className="text-sm text-gray-600 text-center mt-2">Версія: 1.0</p>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Повернутися на головну</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
