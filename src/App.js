import './App.css';
import { Button } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Button as="a" variant="primary">
              Button as link
          </Button>
        <h1>Hello World!</h1>
          <h3>test reload</h3>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
