function CTA({
  headline,
  subtext,
  buttonText,
  buttonLink,
}: {
  headline?: string;
  subtext?: string;
  buttonText?: string;
  buttonLink?: string;
}) {
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