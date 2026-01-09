import { useState } from 'react';
import { X } from 'lucide-react';

interface Artwork {
  id: number;
  title: string;
  image: string;
  size: 'small' | 'medium' | 'large';
  category: string;
}

const artworks: Artwork[] = [
  {
    id: 1,
    title: 'Fern Study in Moonlight',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&q=80',
    size: 'large',
    category: 'Botanical',
  },
  {
    id: 2,
    title: 'Wild Roses at Dawn',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80',
    size: 'medium',
    category: 'Floral',
  },
  {
    id: 3,
    title: 'Ivy & Moss Collection',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80',
    size: 'small',
    category: 'Botanical',
  },
  {
    id: 4,
    title: 'Garden Gate Dreams',
    image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&q=80',
    size: 'medium',
    category: 'Landscape',
  },
  {
    id: 5,
    title: 'Pressed Wildflowers',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80',
    size: 'large',
    category: 'Floral',
  },
  {
    id: 6,
    title: 'Victorian Greenhouse',
    image: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=600&q=80',
    size: 'small',
    category: 'Landscape',
  },
  {
    id: 7,
    title: 'Autumn Leaves Study',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    size: 'medium',
    category: 'Botanical',
  },
  {
    id: 8,
    title: 'Secret Garden Portrait',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=600&q=80',
    size: 'large',
    category: 'Portrait',
  },
];

const GallerySection = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-2';
      case 'small':
      default:
        return 'md:col-span-1';
    }
  };

  return (
    <>
      <section id="gallery" className="relative min-h-screen bg-forest-deep py-24 px-6 md:px-12 lg:px-24">
        {/* Decorative divider */}
        <div className="flex items-center justify-center mb-16">
          <svg width="200" height="60" viewBox="0 0 200 60" className="opacity-50">
            <path 
              d="M 10 30 Q 50 10, 100 30 T 190 30" 
              stroke="#d4af37" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="40" cy="20" r="4" fill="#4a6b5c" opacity="0.6" />
            <circle cx="100" cy="30" r="5" fill="#d4af37" />
            <circle cx="160" cy="20" r="4" fill="#4a6b5c" opacity="0.6" />
            <path 
              d="M 100 25 L 100 35 M 95 30 L 105 30" 
              stroke="#d4af37" 
              strokeWidth="1" 
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-cream mb-4">
            Gallery
          </h2>
          <p className="font-body text-lg text-cream/60 max-w-2xl mx-auto">
            A curated collection of botanical illustrations and nature-inspired artwork
          </p>
        </div>

        {/* Masonry gallery grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {artworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className={`
                group relative overflow-hidden rounded-lg cursor-pointer
                ${getSizeClasses(artwork.size)}
                transition-all duration-500 ease-out
                animate-fadeIn opacity-0
                ${hoveredId === artwork.id ? 'scale-[1.02] z-10' : 'scale-100'}
              `}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredId(artwork.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedArtwork(artwork)}
            >
              {/* Ornate frame border */}
              <div className="absolute inset-0 border-4 border-gold/30 rounded-lg pointer-events-none z-10 
                group-hover:border-gold transition-all duration-500">
                {/* Corner flourishes */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold -m-1 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold -m-1 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold -m-1 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold -m-1 rounded-br-lg" />
              </div>

              {/* Image */}
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out
                  group-hover:scale-110"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-shadow via-forest-shadow/40 to-transparent
                opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                shadow-[inset_0_0_40px_rgba(212,175,55,0.2)]" />

              {/* Title overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-full 
                group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h3 className="font-script text-2xl md:text-3xl text-gold mb-1">
                  {artwork.title}
                </h3>
                <p className="font-body text-sm text-cream/60">
                  {artwork.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative bottom flourish */}
        <div className="flex items-center justify-center mt-16">
          <svg width="150" height="50" viewBox="0 0 150 50" className="opacity-50">
            <path 
              d="M 10 25 Q 40 15, 75 25 T 140 25" 
              stroke="#d4af37" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-forest-shadow/95 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedArtwork(null)}
        >
          {/* Velvet texture overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Ornate close button */}
            <button
              onClick={() => setSelectedArtwork(null)}
              className="absolute -top-4 -right-4 z-10 w-12 h-12 rounded-full 
                bg-gold hover:bg-gold/90 text-forest-deep
                flex items-center justify-center transition-all duration-300
                shadow-lg hover:shadow-xl hover:scale-110"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image container with ornate frame */}
            <div className="relative bg-sage/20 rounded-lg p-4">
              {/* Decorative corners */}
              <div className="absolute -top-2 -left-2 w-16 h-16 border-t-4 border-l-4 border-gold rounded-tl-lg" />
              <div className="absolute -top-2 -right-2 w-16 h-16 border-t-4 border-r-4 border-gold rounded-tr-lg" />
              <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-4 border-l-4 border-gold rounded-bl-lg" />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-4 border-r-4 border-gold rounded-br-lg" />

              <img
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded"
              />

              {/* Title and category */}
              <div className="mt-6 text-center">
                <h3 className="font-script text-4xl text-gold mb-2">
                  {selectedArtwork.title}
                </h3>
                <p className="font-body text-cream/60">
                  {selectedArtwork.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;
