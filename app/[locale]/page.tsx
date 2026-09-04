import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { speakers } from "@/config/speakers";

import Nav from "@/components/nav/Nav";
import Hero from "@/components/hero/Hero";
import Readout from "@/components/readout/Readout";
import About from "@/components/sections/About";
import WhatYouGet from "@/components/sections/WhatYouGet";
import Program from "@/components/sections/Program";
import Speakers from "@/components/sections/Speakers";
import Hackathon from "@/components/sections/Hackathon";
import Certificates from "@/components/sections/Certificates";
import Prerequisites from "@/components/sections/Prerequisites";
import Register from "@/components/sections/Register";
import Venue from "@/components/sections/Venue";
import Faq from "@/components/sections/Faq";
import Team from "@/components/sections/Team";
import Partners from "@/components/sections/Partners";
import PostEvent from "@/components/sections/PostEvent";
import Footer from "@/components/sections/Footer";
import IllustrationSlot from "@/components/ui/IllustrationSlot";
import EventJsonLd from "@/components/seo/EventJsonLd";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <EventJsonLd locale={locale} />
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <Readout />
        <About />
        <WhatYouGet />
        <Program />

        {/* «Нейроны» — разделитель перед секцией Speakers.
            Спикеров нет → секция скрыта, разделитель тоже. */}
        {speakers.length > 0 && (
          <div className="container-max py-8">
            <IllustrationSlot name="neurons" />
          </div>
        )}

        <Speakers />
        <Hackathon />
        <Certificates />
        <Prerequisites />
        <Register />
        <Venue />
        <Faq />
        <Team />
        <Partners />
        <PostEvent />
      </main>
      <Footer />
    </>
  );
}
