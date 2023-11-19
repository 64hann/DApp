import { Header } from "../components/Header"
import { HomepageTitle } from "../components/HomepageTitle"
import { Col, Container, Row, Image } from "react-bootstrap"
import { NFTButton } from "../components/NFTButton"
import { PageBreak } from "../components/PageBreak"
import { useNavigate } from "react-router-dom"

const Landing = () => {
  const navigate = useNavigate()

  function handleStartMintingNow() {
    let path = `/home`
    navigate(path)
  }

  return (
    <div>
      <Header />
      <PageBreak height="10vh" />
      <Container>
        <Row>
          <Col className="container">
            <HomepageTitle />
          </Col>
          <Col>
            <Image src={require("../images/block.jpeg")} fluid />
          </Col>
        </Row>
      </Container>
      <PageBreak height="3vh" />
      <p className="text">
        Authentic tickets. No scammers.<br></br> Just{" "}
        <span style={{ fontWeight: "bold" }}>blockchain</span>.
      </p>
      <PageBreak height="10vh" />
      <div className="container">
        <NFTButton text="Start Minting Now" onClick={handleStartMintingNow} />
      </div>
    </div>
  )
}

export { Landing }
