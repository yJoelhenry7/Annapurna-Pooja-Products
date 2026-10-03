import {
  BRAND_NAME,
  GOOGLE_BUSINESS_URL,
  OG_IMAGE_URL,
  PHONE_TEL,
  SITE_URL,
  WHATSAPP_NUMBER,
} from "../utils/brand";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": SITE_URL,
    name: BRAND_NAME,
    alternateName: ["Annapurna Pooja", "Annapurna Puja Products"],
    description:
      "Temple-quality pooja essentials — incense, diyas, brassware, kumkum, oils, and complete puja kits. Serving Andhra Pradesh & Telangana.",
    url: SITE_URL,
    telephone: PHONE_TEL,
    image: [OG_IMAGE_URL, `${SITE_URL}/logo.svg`],
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
      width: "512",
      height: "512",
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    priceRange: "₹30–₹1499",
    paymentAccepted: "Cash, UPI, Bank Transfer",
    currenciesAccepted: "INR",
    areaServed: [
      { "@type": "State", name: "Andhra Pradesh" },
      { "@type": "State", name: "Telangana" },
    ],
    sameAs: [GOOGLE_BUSINESS_URL, `https://wa.me/${WHATSAPP_NUMBER}`],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE_TEL,
      contactType: "Customer Service",
      availableLanguage: ["English", "Telugu", "Hindi"],
      areaServed: "IN",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "30",
      highPrice: "1499",
      offerCount: "60",
    },
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE_URL}/#products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "About",
        item: `${SITE_URL}/#about`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: `${SITE_URL}/#contact`,
      },
    ],
  };

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Daily Puja Kit",
    description:
      "Complete kit for morning and evening home puja from Annapurna Pooja Products",
    image: `${SITE_URL}/products/kits/daily-puja-kit.svg`,
    brand: {
      "@type": "Brand",
      name: BRAND_NAME,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/#products`,
      priceCurrency: "INR",
      price: "499",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: BRAND_NAME,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData),
        }}
      />
    </>
  );
}
