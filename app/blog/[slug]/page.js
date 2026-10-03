import { notFound } from 'next/navigation';
import { apiGet } from '@/lib/server-api';
import BlogArticle from './BlogArticle';

const opts = { revalidate: 300, tags: ['blogs'] };
const getPost = async (slug) => (await apiGet(`/blogs/${encodeURIComponent(slug)}`, opts))?.data ?? null;

// Rendered on first request, then cached and revalidated (ISR).
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.seo?.metaTitle || post.title?.en || post.title?.hi;
  const description = post.seo?.metaDescription || post.excerpt?.en || post.excerpt?.hi || '';
  const image = post.coverImage?.url;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      ...(image && { images: [{ url: image, alt: post.coverImage?.alt || title }] }),
    },
    twitter: { card: image ? 'summary_large_image' : 'summary', title, description, ...(image && { images: [image] }) },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = post.category
    ? ((await apiGet(`/blogs?category=${encodeURIComponent(post.category)}&limit=4`, opts))?.data ?? []).filter((b) => b.slug !== post.slug).slice(0, 3)
    : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title?.en || post.title?.hi,
    description: post.excerpt?.en || post.excerpt?.hi,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: post.author?.en || 'VedicDhaam' },
    ...(post.coverImage?.url && { image: post.coverImage.url }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <BlogArticle post={post} related={related} />
    </>
  );
}
