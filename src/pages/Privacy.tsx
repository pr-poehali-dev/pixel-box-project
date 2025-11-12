import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 h-16">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Главная</Link>
            <Link to="/editor" className="text-sm font-medium hover:text-primary transition-colors">Редактор</Link>
            <Link to="/gallery" className="text-sm font-medium hover:text-primary transition-colors">Галерея</Link>
            <Link to="/instructions" className="text-sm font-medium hover:text-primary transition-colors">Инструкция</Link>
            <Link to="/buy" className="text-sm font-medium hover:text-primary transition-colors">Купить набор</Link>
            <Link to="/contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <h1 className="text-4xl font-black mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Политика конфиденциальности
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-foreground">
          <div className="bg-card p-6 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-2">
              I Pixel Box
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              г. Екатеринбург, ИП Пегушин, ОГРН 111222333
            </p>
            <p className="text-sm font-semibold">
              Дата вступления в силу: 25 октября 2023 г.
            </p>
          </div>

          <div className="space-y-4">
            <p>
              Мы в I Pixel Box (далее — «Мы», «Сервис») ценим ваше доверие и стремимся защищать ваши персональные данные. 
              Эта Политика конфиденциальности объясняет, какую информацию мы собираем, для каких целей используем и как обеспечиваем ее безопасность.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Собираемая информация</h2>
            <p className="text-muted-foreground">
              Мы можем собирать следующие типы информации:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Контактные данные (имя, email, телефон)</li>
              <li>Техническая информация (IP-адрес, тип браузера, операционная система)</li>
              <li>Данные об использовании сервиса</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Использование информации</h2>
            <p className="text-muted-foreground">
              Собранная информация используется для:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Предоставления и улучшения наших услуг</li>
              <li>Коммуникации с пользователями</li>
              <li>Анализа использования сервиса</li>
              <li>Обеспечения безопасности</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Защита данных</h2>
            <p className="text-muted-foreground">
              Мы применяем современные технологии для защиты ваших персональных данных от несанкционированного доступа, 
              изменения, раскрытия или уничтожения.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Передача данных третьим лицам</h2>
            <p className="text-muted-foreground">
              Мы не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, 
              предусмотренных законодательством РФ.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Ваши права</h2>
            <p className="text-muted-foreground">
              Вы имеете право на доступ, изменение и удаление ваших персональных данных. 
              Для этого свяжитесь с нами по адресу info@ipixelbox.ru
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Контакты</h2>
            <p className="text-muted-foreground">
              По вопросам, связанным с политикой конфиденциальности, обращайтесь:<br />
              Email: info@ipixelbox.ru<br />
              Адрес: г. Екатеринбург, Россия
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/" className="text-primary hover:underline">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
