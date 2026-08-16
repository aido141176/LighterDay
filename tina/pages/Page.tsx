import { tinaField } from "tinacms/dist/react";
import CTA from "../components/CTA";
import Hero from "../components/Hero";
import CardGridSection from "../components/CardGridSection";
import Team from "../components/Team";
import Testimonial from "../components/Testimonial";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import FAQ from "../components/FAQ";
import BlogSection from "../components/BlogSection";
import FullText from "../components/FullText";
import TextWithImage from "../components/TextWithImage";
import HeroCarousel from "../components/HeroCarousel";
import Contact from "../components/Contact";
import ContactForm from "../components/ContactForm";

type Props = {
  page: any;
  posts?: any[];
};

export default function Page({ page, posts = [] }: Props) {
  const seoTitle = page?.seoTitle;
  const blocks = page?.blocks ?? [];

  return (
    <main className="">
      <div className="">
        {blocks.map((block: any, index: number) => {
          switch (block.__typename) {
            case "PageBlocksHero":
              return (
                <div key={index} data-tina-field={tinaField(page, "blocks")}>
                  <Hero block={block} />
                </div>
              );

            case "PageBlocksCta":
              return (
                <div key={index} data-tina-field={tinaField(page, "blocks")}>
                  <CTA block={block} />
                </div>
              );

              case "PageBlocksCardGridSection":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <CardGridSection block={block} />
                  </div>
                );

              case "PageBlocksTeam":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <Team block={block} />
                  </div>
                );

              case "PageBlocksTestimonial":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <Testimonial block={block} />
                  </div>
                );

              case "PageBlocksServices":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <Services block={block} />
                  </div>
                );

              case "PageBlocksGallery":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <Gallery block={block} />
                  </div>
                );

              case "PageBlocksFaq":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <FAQ block={block} />
                  </div>
                );

              case "PageBlocksBlog":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <BlogSection block={block} posts={posts} />
                  </div>
                );

              case "PageBlocksFullText":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <FullText block={block} />
                  </div>
                );

              case "PageBlocksTextWithImage":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <TextWithImage block={block} />
                  </div>
                );

              case "PageBlocksHeroCarousel":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <HeroCarousel block={block} />
                  </div>
                );

              case "PageBlocksContact":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <Contact block={block} />
                  </div>
                );

              case "PageBlocksContactForm":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <ContactForm block={block} />
                  </div>
                );

            default:
              return null;
          }
        })}
      </div>
    </main>
  );
}