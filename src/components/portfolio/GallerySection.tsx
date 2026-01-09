import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useTilt } from '../../hooks/useTilt';

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
    title: 'Sunrise',
    image: '/portfolio/1.jpeg',
    size: 'large',
    category: 'Landscape',
  },
  {
    id: 2,
    title: 'Papa Looks at Cheeto',
    image: '/portfolio/2.jpeg',
    size: 'medium',
    category: 'Portrait',
  },
  {
    id: 3,
    title: 'I love my cat',
    image: '/portfolio/3.jpeg',
    size: 'medium',
    category: 'Portrait',
  },
  {
    id: 4,
    title: 'Monsterra Plant',
    image: '/portfolio/4.jpeg',
    size: 'large',
    category: 'Botanical',
  },
  {
    id: 5,
    title: 'The little bang',
    image: '/portfolio/5.jpeg',
    size: 'large',
    category: 'Landscape',
  },
  {
    id: 6,
    title: 'Isla Grinning',
    image: '/portfolio/6.jpeg',
    size: 'small',
    category: 'Portrait',
  },
  {
    id: 7,
    title: 'Coop the Ewok',
    image: '/portfolio/7.jpeg',
    size: 'large',
    category: 'Portrait',
  },
  {
    id: 8,
    title: 'Noah straight chillin',
    image: '/portfolio/8.jpeg',
    size: 'small',
    category: 'Portrait',
  },
];

/** Individual gallery card with tilt effect */
const GalleryCard = ({ 
  artwork, 
  index, 
  onSelect,
  isInView,
}: { 
  artwork: Artwork; 
  index: number;
  onSelect: (artwork: Artwork) => void;
  isInView: boolean;
}) => {
  const { ref, style } = useTilt({ maxRotation: 4, scale: 1.02 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={getSizeClasses(artwork.size)}
    >
      <div
        ref={ref}
        style={prefersReducedMotion ? {} : style}
        className="group relative overflow-hidden rounded-lg cursor-pointer h-full min-h-[300px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSelect(artwork)}
      >
        {/* Ornate frame border */}
        <div className={`
          absolute inset-0 border-4 rounded-lg pointer-events-none z-10 
          transition-all duration-500
          ${isHovered ? 'border-gold' : 'border-gold/30'}
        `}>
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
          className={`
            w-full h-full object-cover transition-transform duration-700 ease-out
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
        />

        {/* Overlay gradient */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-forest-shadow via-forest-shadow/40 to-transparent
          transition-opacity duration-500
          ${isHovered ? 'opacity-80' : 'opacity-60'}
        `} />

        {/* Glow effect on hover */}
        <motion.div 
          className="absolute inset-0 shadow-[inset_0_0_40px_rgba(212,175,55,0.2)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Title overlay */}
        <motion.div 
          className="absolute inset-x-0 bottom-0 p-6"
          initial={{ y: '100%' }}
          animate={{ y: isHovered ? 0 : '100%' }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h3 className="font-script text-2xl md:text-3xl text-gold mb-1">
            {artwork.title}
          </h3>
          <p className="font-body text-sm text-cream/60">
            {artwork.category}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const GallerySection = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <section id="gallery" className="relative min-h-screen bg-forest-deep py-24 px-6 md:px-12 lg:px-24">
        {/* Decorative divider */}
        <motion.div 
          className="flex items-center justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <svg width="200" height="60" viewBox="0 0 200 60" className="opacity-50">
            <motion.path 
              d="M 10 30 Q 50 10, 100 30 T 190 30" 
              stroke="#d4af37" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.circle 
              cx="40" cy="20" r="4" fill="#4a6b5c" opacity="0.6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.3 }}
            />
            <motion.circle 
              cx="100" cy="30" r="5" fill="#d4af37"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.3 }}
            />
            <motion.circle 
              cx="160" cy="20" r="4" fill="#4a6b5c" opacity="0.6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.3 }}
            />
            <motion.path 
              d="M 100 25 L 100 35 M 95 30 L 105 30" 
              stroke="#d4af37" 
              strokeWidth="1" 
              opacity="0.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.4 }}
            />
          </svg>
        </motion.div>

        {/* Section title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold text-cream mb-4">
            Gallery
          </h2>
          <p className="font-body text-lg text-cream/60 max-w-2xl mx-auto">
            A curated collection of paintings, illustrations, and nature-inspired artwork
          </p>
        </motion.div>

        {/* Masonry gallery grid */}
        <div 
          ref={gridRef}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]"
        >
          {artworks.map((artwork, index) => (
            <GalleryCard
              key={artwork.id}
              artwork={artwork}
              index={index}
              onSelect={setSelectedArtwork}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Decorative bottom flourish */}
        <motion.div 
          className="flex items-center justify-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <svg width="150" height="50" viewBox="0 0 150 50" className="opacity-50">
            <motion.path 
              d="M 10 25 Q 40 15, 75 25 T 140 25" 
              stroke="#d4af37" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-forest-shadow/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedArtwork(null)}
          >
            {/* Velvet texture overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
              }}
            />

            <motion.div 
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ornate close button */}
              <motion.button
                onClick={() => setSelectedArtwork(null)}
                className="absolute -top-4 -right-4 z-10 w-12 h-12 rounded-full 
                  bg-gold hover:bg-gold/90 text-forest-deep
                  flex items-center justify-center transition-all duration-300
                  shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Image container with ornate frame */}
              <div className="relative bg-sage/20 rounded-lg p-4">
                {/* Decorative corners with animation */}
                <motion.div 
                  className="absolute -top-2 -left-2 w-16 h-16 border-t-4 border-l-4 border-gold rounded-tl-lg"
                  initial={{ opacity: 0, x: -10, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                />
                <motion.div 
                  className="absolute -top-2 -right-2 w-16 h-16 border-t-4 border-r-4 border-gold rounded-tr-lg"
                  initial={{ opacity: 0, x: 10, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                />
                <motion.div 
                  className="absolute -bottom-2 -left-2 w-16 h-16 border-b-4 border-l-4 border-gold rounded-bl-lg"
                  initial={{ opacity: 0, x: -10, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                />
                <motion.div 
                  className="absolute -bottom-2 -right-2 w-16 h-16 border-b-4 border-r-4 border-gold rounded-br-lg"
                  initial={{ opacity: 0, x: 10, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                />

                <motion.img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                />

                {/* Title and category */}
                <motion.div 
                  className="mt-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <h3 className="font-script text-4xl text-gold mb-2">
                    {selectedArtwork.title}
                  </h3>
                  <p className="font-body text-cream/60">
                    {selectedArtwork.category}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;
