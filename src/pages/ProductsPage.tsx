import { useState } from 'react';
import { motion } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const allProducts = [
  {
    id: 1,
    image: '/jaggery-solid-regular.jpg',
    name: 'Cube Jaggery - Premium',
    description: 'Perfect cubes of pure jaggery, ideal for daily use and traditional recipes.',
    price: '₹299/kg',
    category: 'cube',
  },
  {
    id: 2,
    image: 'jaggery-cubes.jpg',
    name: 'Cube Jaggery - Regular',
    description: 'Traditional cube jaggery perfect for everyday cooking and beverages.',
    price: '₹249/kg',
    category: 'cube',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1671548185843-3f50c6c1060b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25leSUyMGxpcXVpZCUyMGdvbGRlbnxlbnwxfHx8fDE3NjEzMTA3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'Liquid Jaggery - Pure',
    description: 'Smooth, golden liquid jaggery perfect for drinks, desserts, and marinades.',
    price: '₹349/kg',
    category: 'liquid',
  },
  {
    id: 4,
    image: '/natural-liquid-jaggery.jpg',
    name: 'Liquid Jaggery - Organic',
    description: 'Premium organic liquid jaggery with rich flavor and natural sweetness.',
    price: '₹399/kg',
    category: 'liquid',
  },
  {
    id: 5,
    image: 'jaggery-powder.jpg',
    name: 'Powder Jaggery - Fine',
    description: 'Finely powdered jaggery for easy mixing in beverages and baking.',
    price: '₹279/kg',
    category: 'powder',
  },
  {
    id: 6,
    image: '/jaggery-powder2.webp',
    name: 'Powder Jaggery - Coarse',
    description: 'Coarse powder perfect for traditional sweets and cooking.',
    price: '₹259/kg',
    category: 'powder',
  },
  {
    id: 7,
    image: 'jaggery-block.jpg',
    name: 'Block Jaggery - Large',
    description: 'Traditional large blocks ideal for festivals and special occasions.',
    price: '₹329/kg',
    category: 'cube',
  },
  {
    id: 8,
    image: 'jaggery-block1.jpg',
    name: 'Block Jaggery - Mini',
    description: 'Convenient mini blocks perfect for portion control and gifting.',
    price: '₹289/kg',
    category: 'cube',
  },
  {
    id: 9,
    image: 'jaggery-powder2.jpg',
    name: 'Powder Jaggery - Organic',
    description: 'Premium organic powder jaggery with certified purity.',
    price: '₹319/kg',
    category: 'powder',
  },
];

export function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
    }
    if (sortBy === 'price-high') {
      return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] to-white">
      {/* Hero Section */}
      <section className="bg-[#2C1810] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl text-[#FFF8E7] mb-4 font-serif"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#C5A572] max-w-2xl mx-auto"
          >
            Discover our complete range of premium organic jaggery products
          </motion.p>
        </div>
      </section>

      {/* Filter & Sort Section */}
      <section className="py-8 border-b border-[#C5A572]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-[#5C4033]" />
              <span className="text-[#2C1810]">Filter:</span>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  className={selectedCategory === 'all' 
                    ? 'bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]'
                    : 'border-[#C5A572] text-[#2C1810] hover:bg-[#D4AF37]/10'
                  }
                >
                  All Products
                </Button>
                <Button
                  variant={selectedCategory === 'cube' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('cube')}
                  className={selectedCategory === 'cube' 
                    ? 'bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]'
                    : 'border-[#C5A572] text-[#2C1810] hover:bg-[#D4AF37]/10'
                  }
                >
                  Cube & Blocks
                </Button>
                <Button
                  variant={selectedCategory === 'liquid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('liquid')}
                  className={selectedCategory === 'liquid' 
                    ? 'bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]'
                    : 'border-[#C5A572] text-[#2C1810] hover:bg-[#D4AF37]/10'
                  }
                >
                  Liquid
                </Button>
                <Button
                  variant={selectedCategory === 'powder' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('powder')}
                  className={selectedCategory === 'powder' 
                    ? 'bg-[#D4AF37] text-[#2C1810] hover:bg-[#C5A572]'
                    : 'border-[#C5A572] text-[#2C1810] hover:bg-[#D4AF37]/10'
                  }
                >
                  Powder
                </Button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[#2C1810]">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] border-[#C5A572]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  image={product.image}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                />
              </motion.div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#5C4033]">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
