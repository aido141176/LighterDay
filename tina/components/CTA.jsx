export default function CTA({ data }) {
  return (
    <section style={{ padding: "60px", textAlign: "center" }}>
      <h2>{data.headline}</h2>
      <p>{data.subtext}</p>
      <a href={data.buttonLink}>
        <button>{data.buttonText}</button>
      </a>
    </section>
  );
}