import { Link } from 'react-router-dom';

const Buy = () => {
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
        <h1 className="text-5xl font-black text-center mb-12" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Купить набор
        </h1>
        <div className="text-center text-muted-foreground">
          <p>Информация о покупке наборов появится здесь</p>
        </div>
      </div>
    </div>
  );
};

export default Buy;
