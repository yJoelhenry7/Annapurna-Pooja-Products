import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ProductDetail from "../../../components/ProductDetail";
import { CATALOG, getProductById } from "../../../data/products";
import enMessages from "../../../../messages/en.json";
import teMessages from "../../../../messages/te.json";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  const locales = ["en", "te"];
  return locales.flatMap((locale) =>
    CATALOG.map((product) => ({ locale, id: product.id }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, id } = await params;
  const product = getProductById(id);
  if (!product) return {};

  const catalog = locale === "te" ? teMessages.products : enMessages.products;
  const entry = catalog[id as keyof typeof catalog];
  const name =
    entry && typeof entry === "object" && "name" in entry
      ? entry.name
      : id;
  const description =
    entry && typeof entry === "object" && "description" in entry
      ? entry.description
      : "";

  return {
    title: `${name} | Annapurna Pooja Products`,
    description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <>
      <Navbar />
      <main>
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}
