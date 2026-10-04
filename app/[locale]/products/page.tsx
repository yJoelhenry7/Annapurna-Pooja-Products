import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductsCatalog from "../../components/ProductsCatalog";
import { BRAND_NAME, SITE_URL } from "../../utils/brand";
import enMessages from "../../../messages/en.json";
import teMessages from "../../../messages/te.json";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const products =
    locale === "te" ? teMessages.products : enMessages.products;

  return {
    title: `${products.catalogTitle} | ${BRAND_NAME}`,
    description: products.catalogDescription,
    alternates: {
      canonical: `/${locale}/products`,
    },
    openGraph: {
      title: products.catalogTitle,
      description: products.catalogDescription,
      url: `${SITE_URL}/${locale}/products`,
    },
  };
}

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProductsCatalog />
      </main>
      <Footer />
    </>
  );
}
