import { Header } from "../components/Header"
import { SectionDescription, SectionTitle } from "../components/Titles"

const Marketplace = () => {
  return (
    <div>
      <Header />
      <div
        style={{
          alignItems: "center",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <SectionTitle text="Marketplace" />
        <SectionDescription text="Explore our user-listed NFT ticket marketplace where each purchase is worry-free, backed by the assurance of blockchain verification." />
      </div>
    </div>
  )
}

export { Marketplace }
