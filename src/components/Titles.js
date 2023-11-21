const HomepageTitle = () => {
  return (
    <h1 className="homepage-title">
      Reimagining concert tickets, one <span className="highlight">block</span>{" "}
      at a time
    </h1>
  )
}

const PageBreak = (prop) => {
  return <div style={{ height: prop.height }}></div>
}

const SectionTitle = ({ text }) => {
  return <h3 className="section-title">{text}</h3>
}

const SectionDescription = ({ text }) => {
  return <p className="section-description">{text}</p>
}

export { HomepageTitle, PageBreak, SectionTitle, SectionDescription }
