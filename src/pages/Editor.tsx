import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

type MosaicType = 'lego' | 'coloring' | 'round' | 'square';
type Orientation = 'landscape' | 'portrait' | 'square';
type Base = 'canvas' | 'stretcher';

const Editor = () => {
  const [mosaicType, setMosaicType] = useState<MosaicType>('lego');
  const [orientation, setOrientation] = useState<Orientation>('landscape');
  const [size, setSize] = useState<string>('');
  const [base, setBase] = useState<Base>('canvas');
  const [image, setImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const legoSizes = {
    landscape: ['51x76 см.', '76x102 см.', '102x128 см.', '128x153 см.', '153x179 см.', '179x204 см.', '204x230 см.', '230x256 см.', '256x281 см.', '281x307 см.'],
    portrait: ['76x51 см.', '102x76 см.', '128x102 см.', '153x128 см.', '179x153 см.', '204x179 см.', '230x204 см.', '256x230 см.', '281x256 см.', '307x281 см.'],
    square: ['51x51 см.', '76x76 см.', '102x102 см.', '128x128 см.', '153x153 см.', '179x179 см.', '204x204 см.', '230x230 см.', '256x256 см.', '281x281 см.']
  };

  const otherSizes = {
    landscape: ['Формат А4 (210x297)', 'Формат А3 (297x420)', 'Формат А2 (420x594)', 'Формат А1 (594x841)', 'Формат А0 (841x1189)', '20x30 см.', '30x40 см.', '40x50 см.', '40x60 см.', '50x70 см.', '60x80 см.', '70x90 см.', '80x120', '90x120', '100x120'],
    portrait: ['Формат А4 (297x210)', 'Формат А3 (420x297)', 'Формат А2 (594x420)', 'Формат А1 (841x594)', 'Формат А0 (1189x841)', '30x20 см.', '40x30 см.', '50x40 см.', '60x40 см.', '70x50 см.', '80x60 см.', '90x70 см.', '120x80 см.', '120x90 см.', '120x100 см.'],
    square: ['20x20 см.', '30x30 см.', '40x40 см.', '50x50 см.', '60x60 см.', '70x70 см.', '80x80 см.', '90x90 см.', '100x100 см.', '110x110 см.', '120x120 см.']
  };

  const getSizes = () => {
    if (mosaicType === 'lego') {
      return legoSizes[orientation];
    }
    return otherSizes[orientation];
  };

  const getAspectRatio = () => {
    if (!size) return 1;
    const match = size.match(/(\d+)x(\d+)/);
    if (!match) return 1;
    const height = parseInt(match[1]);
    const width = parseInt(match[2]);
    return height / width;
  };

  useEffect(() => {
    const sizes = getSizes();
    setSize(sizes[0]);
  }, [mosaicType, orientation]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setScale(1);
        setPosition({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!image) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const aspectRatio = getAspectRatio();

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 h-16">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Главная</Link>
            <Link to="/editor" className="text-sm font-medium text-primary">Редактор</Link>
            <Link to="/gallery" className="text-sm font-medium hover:text-primary transition-colors">Галерея</Link>
            <Link to="/instructions" className="text-sm font-medium hover:text-primary transition-colors">Инструкция</Link>
            <Link to="/buy" className="text-sm font-medium hover:text-primary transition-colors">Купить набор</Link>
            <Link to="/contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-5xl font-black text-center mb-12" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Редактор I PIXEL BOX
        </h1>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Тип мозаики</label>
              <Select value={mosaicType} onValueChange={(value) => setMosaicType(value as MosaicType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lego">ЛЕГО</SelectItem>
                  <SelectItem value="coloring">Раскраска</SelectItem>
                  <SelectItem value="round">Круглые стразы</SelectItem>
                  <SelectItem value="square">Квадратные стразы</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Ориентация</label>
              <Select value={orientation} onValueChange={(value) => setOrientation(value as Orientation)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="landscape">Альбомная</SelectItem>
                  <SelectItem value="portrait">Книжная</SelectItem>
                  <SelectItem value="square">Квадратная</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Размер мозаики</label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getSizes().map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {mosaicType !== 'lego' && (
              <div>
                <label className="text-sm font-medium mb-2 block">Выбор основы</label>
                <Select value={base} onValueChange={(value) => setBase(value as Base)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="canvas">Холст</SelectItem>
                    <SelectItem value="stretcher">Подрамник</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              className="w-full"
              variant="outline"
            >
              <Upload className="mr-2 h-4 w-4" />
              Загрузить изображение
            </Button>
          </div>

          <div className="flex items-center justify-center">
            <div 
              ref={canvasRef}
              className="relative bg-card border-2 border-primary/30 rounded-lg shadow-2xl overflow-hidden cursor-move"
              style={{
                width: aspectRatio > 1 ? '400px' : `${400 / aspectRatio}px`,
                height: aspectRatio > 1 ? `${400 * aspectRatio}px` : '700px',
                maxWidth: '100%',
                maxHeight: '700px'
              }}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  className="absolute pixel-effect select-none"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: 'center',
                    maxWidth: 'none',
                    pointerEvents: 'none'
                  }}
                  draggable={false}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 mb-2 opacity-50" />
                    <p>Загрузите изображение</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
