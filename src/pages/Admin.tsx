import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [instructions, setInstructions] = useState('Как использовать редактор:\n1. Выберите тип мозаики\n2. Загрузите изображение\n3. Настройте параметры');
  const [contacts, setContacts] = useState('Email: info@ipixelbox.ru\nТелефон: +7 (900) 123-45-67\nАдрес: г. Екатеринбург');
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setGalleryPhotos(prev => prev.filter((_, i) => i !== index));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="p-8 w-full max-w-md">
          <h1 className="text-3xl font-black mb-6 text-center" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Панель администратора
          </h1>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Войти
            </Button>
            <div className="text-center">
              <Link to="/" className="text-sm text-primary hover:underline">
                Вернуться на главную
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h2 className="font-bold">Админ-панель</h2>
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              На главную
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-black mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Управление сайтом
        </h1>

        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Image" size={24} />
              Галерея ({galleryPhotos.length} фото)
            </h2>
            {galleryPhotos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryPhotos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={photo} 
                      alt={`Gallery ${index}`}
                      className="w-full h-32 object-cover rounded border border-border"
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemovePhoto(index)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Нет загруженных фотографий</p>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Icon name="BookOpen" size={24} />
              Инструкции
            </h2>
            <Textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={8}
              className="mb-4"
            />
            <Button>Сохранить инструкции</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Mail" size={24} />
              Контакты
            </h2>
            <Textarea
              value={contacts}
              onChange={(e) => setContacts(e.target.value)}
              rows={6}
              className="mb-4"
            />
            <Button>Сохранить контакты</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
