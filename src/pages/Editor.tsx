import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [rotation, setRotation] = useState(0);
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

  const fitImageToCanvas = () => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;
    const img = new Image();
    img.onload = () => {
      const imgAspect = img.width / img.height;
      const canvasAspect = canvasWidth / canvasHeight;
      let newScale = 1;
      if (imgAspect > canvasAspect) {
        newScale = canvasWidth / img.width;
      } else {
        newScale = canvasHeight / img.height;
      }
      setScale(newScale);
      setPosition({ x: 0, y: 0 });
    };
    img.src = image;
  };

  useEffect(() => {
    const sizes = getSizes();
    setSize(sizes[0]);
  }, [mosaicType, orientation]);

  useEffect(() => {
    if (image) {
      fitImageToCanvas();
    }
  }, [image, size, orientation]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setFlipH(false);
        setFlipV(false);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = () => {
    if (!image) {
      fileInputRef.current?.click();
    }
  };

  const downloadMosaic = () => {
    if (!image || !canvasRef.current) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const match = size.match(/(\d+)x(\d+)/);
    if (!match) return;
    const height = parseInt(match[1]);
    const width = parseInt(match[2]);
    
    canvas.width = width * 10;
    canvas.height = height * 10;

    const img = new Image();
    img.onload = () => {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.scale(scale, scale);
      ctx.drawImage(img, -img.width / 2 + position.x / scale, -img.height / 2 + position.y / scale);
      ctx.restore();

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `mosaic_${width}x${height}.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
      });
    };
    img.src = image;
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
  const maxWidth = 500;
  const maxHeight = 490;
  let canvasWidth, canvasHeight;

  if (orientation === 'landscape') {
    canvasWidth = maxWidth;
    canvasHeight = maxWidth * aspectRatio;
    if (canvasHeight > maxHeight) {
      canvasHeight = maxHeight;
      canvasWidth = maxHeight / aspectRatio;
    }
  } else if (orientation === 'portrait') {
    canvasHeight = maxHeight;
    canvasWidth = maxHeight / aspectRatio;
    if (canvasWidth > maxWidth) {
      canvasWidth = maxWidth;
      canvasHeight = maxWidth * aspectRatio;
    }
  } else {
    const sizeVal = Math.min(maxWidth, maxHeight);
    canvasWidth = sizeVal;
    canvasHeight = sizeVal;
  }

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
              onClick={downloadMosaic}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              disabled={!image}
            >
              Создать варианты Мозаики
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div 
              ref={canvasRef}
              className="relative bg-card border-2 border-primary/30 rounded-lg shadow-2xl overflow-hidden cursor-move"
              style={{
                width: `${canvasWidth}px`,
                height: `${canvasHeight}px`
              }}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onClick={handleCanvasClick}
            >
              {image ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="pixel-effect select-none"
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1}) rotate(${rotation}deg)`,
                      transformOrigin: 'center',
                      maxWidth: 'none',
                      pointerEvents: 'none'
                    }}
                    draggable={false}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                  <div className="text-center">
                    <Icon name="Upload" size={48} className="mx-auto mb-2 opacity-50" />
                    <p>Нажмите для загрузки</p>
                  </div>
                </div>
              )}
            </div>

            {image && (
              <div className="flex flex-col gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setScale(prev => Math.min(3, prev + 0.1))}
                  title="Увеличить"
                >
                  <Icon name="ZoomIn" size={20} />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}
                  title="Уменьшить"
                >
                  <Icon name="ZoomOut" size={20} />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setFlipV(!flipV)}
                  title="Отразить по вертикали"
                >
                  <Icon name="FlipVertical" size={20} />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setFlipH(!flipH)}
                  title="Отразить по горизонтали"
                >
                  <Icon name="FlipHorizontal" size={20} />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setRotation(prev => (prev + 90) % 360)}
                  title="Повернуть на 90°"
                >
                  <Icon name="RotateCw" size={20} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
