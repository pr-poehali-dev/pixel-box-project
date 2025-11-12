import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home = () => {
  const categories = [
    { name: 'ЛЕГО наборы', position: 'top-8 left-8', gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Раскраски', position: 'bottom-8 left-8', gradient: 'from-yellow-500 to-orange-500' },
    { name: 'Круглые стразы', position: 'top-8 right-8', gradient: 'from-pink-500 to-rose-500' },
    { name: 'Квадратные стразы', position: 'bottom-8 right-8', gradient: 'from-purple-500 to-violet-500' }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
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

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-16">
        <div className="mb-8 animate-in fade-in duration-700">
          <img 
            src="https://cdn.poehali.dev/files/c4878207-a4c2-4688-8100-722c0f74d5ce.png" 
            alt="I PIXEL BOX Logo" 
            className="w-64 h-64 object-contain drop-shadow-2xl"
          />
        </div>

        <h1 className="text-7xl font-black mb-4 text-center animate-in fade-in duration-700 delay-200" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          I PIXEL BOX
        </h1>

        <p className="text-xl text-muted-foreground mb-8 text-center animate-in fade-in duration-700 delay-300">
          Профессиональный редактор для создания мозаики
        </p>

        <Link to="/editor" className="animate-in fade-in duration-700 delay-500">
          <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
            Создать мозаику
          </Button>
        </Link>
      </div>

      {categories.map((category, index) => (
        <div
          key={category.name}
          className={`absolute ${category.position} animate-in fade-in duration-700 delay-${600 + index * 100}`}
        >
          <div className={`w-48 h-48 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center p-6 shadow-2xl hover:scale-105 transition-transform cursor-pointer border border-white/10`}>
            <h3 className="text-white text-center font-bold text-lg drop-shadow-lg">
              {category.name}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
