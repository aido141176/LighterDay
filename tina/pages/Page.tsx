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
import Stats from "../components/Stats";
import Logos from "../components/Logos";
import Pricing from "../components/Pricing";
import VideoEmbed from "../components/VideoEmbed";
import MapEmbed from "../components/MapEmbed";
import Steps from "../components/Steps";
import CustomHtml from "../components/CustomHtml";
import HeroBasic from "../components/HeroBasic";
import HeroSplit from "../components/HeroSplit";

type Props = {
  page: any;
  posts?: any[];
};

export default function Page({ page, posts = [] }: Props) {
  const blocks = page?.blocks ?? [];

  return (
    <main className="">
      <div className="">
        {blocks.map((block: any, index: number) => {
          switch (block.__typename) {
            case "PageBlocksHero":
              return (
                <div key={index} data-tina-field={tinaField(page, "blocks")}>
                  <Hero block={block} isFirst={index === 0} />
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

              case "PageBlocksStats":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <Stats block={block} />
                  </div>
                );

              case "PageBlocksLogos":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <Logos block={block} />
                  </div>
                );

              case "PageBlocksPricing":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <Pricing block={block} />
                  </div>
                );

              case "PageBlocksVideoEmbed":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <VideoEmbed block={block} />
                  </div>
                );

              case "PageBlocksMapEmbed":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <MapEmbed block={block} />
                  </div>
                );

              case "PageBlocksSteps":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <Steps block={block} />
                  </div>
                );

              case "PageBlocksCustomHtml":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <CustomHtml block={block} />
                  </div>
                );

              case "PageBlocksHeroBasic":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <HeroBasic block={block} isFirst={index === 0} />
                  </div>
                );

              case "PageBlocksHeroSplit":
                return (
                  <div key={index} data-tina-field={tinaField(page, "blocks")}>
                    <HeroSplit block={block} isFirst={index === 0} />
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