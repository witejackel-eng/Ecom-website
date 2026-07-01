import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/data/products';
import FadeIn, { ScaleIn } from '@/components/ui/FadeIn';
import SectionLabel from '@/components/SectionLabel';
import { ShoppingCart, Check, Heart, Share2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ProductJsonLd from '@/components/ProductJsonLd';
import { SITE_URL } from '@/app/metadata';

interface MetaProps { params: Promise<{ id: string }>; }
export async function generateMetadata({ params }: MetaProps) {
  const { id } = await params;
  const product = products.find(p => p.id === id);
  if (!product) return { title: 'Product Not Found | DeviceDestination', robots: { index: false, follow: false } };
  const url = `${SITE_URL}/products/${product.id}`;
  return {
    title: `${product.name} (${product.model}) | DeviceDestination`,
    description: product.shortDescription,
    keywords: [product.brand, product.model, product.category, `${product.brand} ${product.category}`, `${product.category} price Delhi`, 'OEM warranty CCTV'],
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title: product.name, description: product.shortDescription, url, images: [{ url: product.images[0], width: 1200, height: 630, alt: product.name }] },
    twitter: { title: product.name, description: product.shortDescription, images: [product.images[0]] },
  };
}

interface Props { params: Promise<{ id: string }>; }
function ProductDetailClient({ product }: { product: typeof products[0] }) {
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = (useState as any)(product.images[0] || '');
  const [addedCart, setAddedCart] = (useState as any)(false);
  if (!product) return notFound();
  return (
    <main className="min-h-screen pt-40 pb-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
            <li><a href="/" className="hover:text-white/60">Home</a></li>
            <li aria-hidden="true">/</li>
            <li><a href="/products" className="hover:text-white/60">Products</a></li>
            <li aria-hidden="true">/</li>
            <li><span aria-current="page" className="text-white/50">{product.brand} / {product.category} / {product.model}</span></li>
          </ol>
        </nav>
        <ProductJsonLd product={product} />
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">
          <div className="space-y-8">
            <ScaleIn duration={0.8} className="glass rounded-[24px] border-white/10 p-4 aspect-square flex items-center justify-center bg-white">
              <Image src={mainImage} alt={product.name} fill className="object-contain p-4" priority />
            </ScaleIn>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setMainImage(img)} className={`relative aspect-square rounded-2xl overflow-hidden border transition-all ${mainImage === img ? 'border-primary glass' : 'border-white/5 bg-white/5 hover:border-white/20'}`} aria-label={`${product.name} image ${i + 1}`}>
                    <Image src={img} alt={`${product.name} view ${i+1}`} fill className="object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-8">
            <FadeIn direction="up">
              <p className="text-[10px] font-bold text-[var(--color-tangerine)] uppercase tracking-[0.2em] mb-3">{product.brand}</p>
              <h1 className="text-white text-3xl md:text-4xl font-black tracking-tighter leading-tight mb-4">{product.name}</h1>
              <p className="text-white/55 leading-relaxed">{product.shortDescription}</p>
            </FadeIn>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl font-black text-white tracking-tight">{product.price.toLocaleString('en-IN')}</span>
              {product.mrp > product.price && (<><span className="text-xl font-black text-white/25 line-through">{product.mrp.toLocaleString('en-IN')}</span><span className="inline-flex items-center rounded-full bg-[var(--color-tangerine)]/20 border border-[var(--color-tangerine)]/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-tangerine)]">GST Inclusive</span></>)}
            </div>
            <hr className="border-white/5" />
            <div className="flex flex-wrap gap-3">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-tangerine)] to-[var(--color-tangerine-light)] text-white font-bold text-sm uppercase tracking-[0.2em] shadow-lg hover:shadow-xl transition-all flex items-center gap-2" onClick={() => { addToCart(product, 1); setAddedCart(true); setTimeout(() => setAddedCart(false), 2000); }}>{addedCart ? <><Check size={18} /> Added</> : <><ShoppingCart size={18} /> Add to Cart</>}</button>
              <button className="w-14 h-14 rounded-full border border-white/10 text-gray-400 hover:text-[var(--color-tangerine)] hover:border-[rgba(255,138,0,0.4)] transition-all" aria-label="Wishlist"><Heart size={20} /></button>
              <button className="w-14 h-14 rounded-full border border-white/10 text-gray-400 hover:text-[var(--color-tangerine)] hover:border-[rgba(255,138,0,0.4)] transition-all" aria-label="Share"><Share2 size={20} /></button>
            </div>
          </div>
        </div>
        <section className="mb-24">
          <SectionLabel>Key Highlights</SectionLabel>
          <div className="grid md:grid-cols-3 gap-6">
            {product.highlights.map((h, i) => (<div key={i} className="glass p-8 rounded-[24px] border-white/5 flex items-center gap-4"><Check className="text-primary shrink-0" size={20} /><span className="text-white text-sm font-bold tracking-wide">{h}</span></div>))}
          </div>
        </section>
        <section className="mb-24">
          <SectionLabel>Product Overview</SectionLabel>
          <div className="glass p-12 rounded-[24px] border-white/5 text-white/70 leading-relaxed space-y-6">
            <p>{product.shortDescription}</p>
            <p>Designed for robust performance, this {product.brand} {product.category} provides top-tier security for {product.useCases.join(', ')}.</p>
            <p>With its advanced imaging technology and durable construction, this system ensures long-term operational reliability and superior coverage for your security requirements.</p>
          </div>
        </section>
        <section className="mb-24">
          <SectionLabel>Technical Specifications</SectionLabel>
          <div className="glass rounded-[24px] border-white/5 overflow-hidden">
            {Object.entries(product.specs).map(([key, val], i) => (
              <div key={key} className={`grid grid-cols-2 p-6 border-b border-white/5 last:border-0 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{key}</span>
                <span className="text-white text-sm font-medium">{val as string}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = products.find(p => p.id === id);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}