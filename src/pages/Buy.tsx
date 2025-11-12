import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Buy = () => {
  const marketplaces = [
    {
      name: 'Wildberries',
      url: 'https://www.wildberries.ru/',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Wildberries_logo.svg',
      color: 'from-purple-600 to-pink-600'
    },
    {
      name: 'OZON',
      url: 'https://www.ozon.ru/',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Ozon_logo_2019.svg',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      name: 'I PIXEL BOX',
      url: '#',
      isOfficial: true,
      color: 'from-gradient-purple to-gradient-blue'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 h-16">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Главная</Link>
            <Link to="/editor" className="text-sm font-medium hover:text-primary transition-colors">Редактор</Link>
            <Link to="/gallery" className="text-sm font-medium hover:text-primary transition-colors">Галерея</Link>
            <Link to="/instructions" className="text-sm font-medium hover:text-primary transition-colors">Инструкция</Link>
            <Link to="/buy" className="text-sm font-medium text-primary">Купить набор</Link>
            <Link to="/contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-5xl font-black text-center mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Купить набор
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          Выберите удобный для вас способ покупки
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {marketplaces.map((marketplace) => (
            <a
              key={marketplace.name}
              href={marketplace.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="p-8 h-64 flex flex-col items-center justify-center bg-card hover:bg-card/80 transition-all border-2 border-border hover:border-primary group-hover:scale-105">
                {marketplace.isOfficial ? (
                  <div className="text-center">
                    <img 
                      src="https://cdn.poehali.dev/files/c4878207-a4c2-4688-8100-722c0f74d5ce.png"
                      alt="I PIXEL BOX"
                      className="w-24 h-24 object-contain mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">Купить на сайте<br/>производителя</h3>
                    <p className="text-sm text-muted-foreground">I PIXEL BOX</p>
                  </div>
                ) : (
                  <div className="text-center w-full">
                    <div className="w-32 h-16 mx-auto mb-4 flex items-center justify-center bg-white rounded-lg p-2">
                      <div className={`text-2xl font-black bg-gradient-to-r ${marketplace.color} bg-clip-text text-transparent`}>
                        {marketplace.name}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">Купить на {marketplace.name}</h3>
                  </div>
                )}
                <Icon name="ExternalLink" size={24} className="mt-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buy;
