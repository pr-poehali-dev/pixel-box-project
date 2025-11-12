import { Link } from 'react-router-dom';

const Terms = () => {
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
          Пользовательское соглашение
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-foreground">
          <div className="bg-card p-6 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-2">
              I Pixel Box
            </p>
            <p className="text-sm text-muted-foreground">
              г. Екатеринбург, ИП Пегушин, ОГРН 111222333
            </p>
          </div>

          <div className="space-y-4">
            <p>
              Настоящее Соглашение определяет условия использования веб-сайта и услуг I Pixel Box (далее — «Сервис»). 
              Владельцем и администратором Сервиса является Индивидуальный предприниматель Пегушин (ИП Пегушин).
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Принятие условий</h2>
            <p className="text-muted-foreground">
              Начиная использование любого раздела нашего Сайта, вы подтверждаете, что полностью ознакомились и 
              безоговорочно принимаете все условия настоящего Соглашения. Если вы не согласны с каким-либо из пунктов, 
              пожалуйста, немедленно прекратите использование Сайта и наших услуг.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Описание услуг</h2>
            <p className="text-muted-foreground">
              Сервис I Pixel Box предоставляет онлайн-редактор для создания пиксельной мозаики из изображений. 
              Пользователи могут загружать изображения, выбирать параметры мозаики и экспортировать результаты.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Права и обязанности пользователя</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Использовать сервис в соответствии с законодательством РФ</li>
              <li>Не загружать материалы, нарушающие авторские права третьих лиц</li>
              <li>Не использовать сервис для незаконных целей</li>
              <li>Соблюдать правила использования сервиса</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Интеллектуальная собственность</h2>
            <p className="text-muted-foreground">
              Все права на дизайн, программное обеспечение и контент сервиса принадлежат ИП Пегушин. 
              Загруженные пользователями изображения остаются собственностью пользователей.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Ограничение ответственности</h2>
            <p className="text-muted-foreground">
              Сервис предоставляется «как есть». Мы не несем ответственности за возможные убытки, 
              связанные с использованием или невозможностью использования сервиса.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Изменение условий</h2>
            <p className="text-muted-foreground">
              Мы оставляем за собой право изменять условия соглашения. Продолжение использования сервиса 
              после внесения изменений означает ваше согласие с новыми условиями.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Контакты</h2>
            <p className="text-muted-foreground">
              По всем вопросам обращайтесь:<br />
              Email: info@ipixelbox.ru<br />
              Адрес: г. Екатеринбург, Россия<br />
              ИП Пегушин, ОГРН 111222333
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

export default Terms;
