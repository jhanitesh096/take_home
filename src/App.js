import NbaTeams from "./pages/nbaTeams";
import "./styles.css";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

const containerStyle = {
  padding: "2rem 5rem",
};

function App() {
  return (
    <Container style={containerStyle} fluid>
      <NbaTeams />
    </Container>
  );
}

export default App;
