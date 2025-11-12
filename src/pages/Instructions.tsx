import { Link } from 'react-router-dom';

const Instructions = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 h-16">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Главная</Link>
            <Link to="/editor" className="text-sm font-medium hover:text-primary transition-colors">Редактор</Link>
            <Link to="/gallery" className="text-sm font-medium hover:text-primary transition-colors">Галерея</Link>
            <Link to="/instructions" className="text-sm font-medium text-primary">Инструкция</Link>
            <Link to="/buy" className="text-sm font-medium hover:text-primary transition-colors">Купить набор</Link>
            <Link to="/contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-5xl font-black text-center mb-12" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Инструкция
        </h1>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-bold mb-4">Как использовать редактор</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Выберите тип мозаики (ЛЕГО, Раскраска или Стразы)</li>
              <li>Выберите ориентацию и размер</li>
              <li>Загрузите ваше изображение</li>
              <li>Масштабируйте колесиком мыши</li>
              <li>Перемещайте изображение мышью внутри рамки</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
