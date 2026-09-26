import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { speakers } from "@/config/speakers";

import ContourField from "@/components/ui/ContourField";
import Nav from "@/components/nav/Nav";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import WhatYouGet from "@/components/sections/WhatYouGet";
import Program from "@/components/sections/Program";
import Speakers from "@/components/sections/Speakers";
import Hackathon from "@/components/sections/Hackathon";
import Register from "@/components/sections/Register";
import Faq from "@/components/sections/Faq";
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
      {/* Одно контурное поле на всю страницу, включая футер: линия проходит
          сквозь границы секций, не начинаясь в каждой заново, и не обрывается
          на кромке футера. На тёмном она гаснет сама — multiply по тёмному
          фону ничего не даёт, — поэтому исчезает вместе с растушёвкой. */}
      <div className="relative flex flex-1 flex-col">
        <ContourField />
        <main id="main" className="flex-1">
          <Hero />
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
        <Register />
        <Faq />
        <Partners />
        <PostEvent />
        </main>
        <Footer />
      </div>
    </>
  );
}
