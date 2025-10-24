import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  price?: string;
}

export function ProductCard({ image, name, description, price }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-[#FFF8E7] rounded-lg overflow-hidden shadow-lg border-2 border-[#C5A572]/20 hover:border-[#D4AF37]/50 transition-all"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-[#2C1810] mb-2">{name}</h3>
        <p className="text-sm text-[#5C4033] mb-4">{description}</p>
        {price && (
          <div className="flex items-center justify-between">
            <span className="text-[#D4AF37]">{price}</span>
            <Button
              size="sm"
              className="bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
