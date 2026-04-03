type CTAProps = {
  headline?: string;
  subtext?: string;
  buttonText?: string;
  buttonLink?: string;
};

export default function CTA({
  headline,
  subtext,
  buttonText,
  buttonLink,
}: CTAProps) {
  return (
    <section style={{ padding: "40px", textAlign: "center" }}>
      <h2>{headline}</h2>
      <p>{subtext}</p>
      <a href={buttonLink}>
        <button>{buttonText}</button>
      </a>
    </section>
  );
}