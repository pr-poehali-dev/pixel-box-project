import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Gallery = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleAddPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && photos.length < 20) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPhotos(prev => [...prev, event.target?.result as string]);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 h-16">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Главная</Link>
            <Link to="/editor" className="text-sm font-medium hover:text-primary transition-colors">Редактор</Link>
            <Link to="/gallery" className="text-sm font-medium text-primary">Галерея</Link>
            <Link to="/instructions" className="text-sm font-medium hover:text-primary transition-colors">Инструкция</Link>
            <Link to="/buy" className="text-sm font-medium hover:text-primary transition-colors">Купить набор</Link>
            <Link to="/contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-5xl font-black text-center mb-8" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Галерея
        </h1>

        <div className="text-center mb-8">
          <Button 
            onClick={handleAddPhoto}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            disabled={photos.length >= 20}
          >
            <Icon name="Upload" size={20} className="mr-2" />
            Поделиться своими достижениями
          </Button>
          {photos.length >= 20 && (
            <p className="text-sm text-muted-foreground mt-2">Достигнут лимит в 20 фотографий</p>
          )}
        </div>

        {photos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo, index) => (
              <div key={index} className="relative group">
                <img 
                  src={photo} 
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg border-2 border-border hover:border-primary transition-all"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <Icon name="Image" size={64} className="mx-auto mb-4 opacity-50" />
            <p>Пока нет загруженных работ</p>
            <p className="text-sm mt-2">Станьте первым, кто поделится своими достижениями!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
