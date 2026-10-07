
import Flag from "./components/Flag";
import GuessForm from "./components/GuessForm";
import ScoreBoard from "./components/ScoreBoard";

function App() {
    return (
        <div className="game">
            <h1>¡Adiviná la bandera!</h1>

            <ScoreBoard />

            <Flag />

            <GuessForm />
        </div>
    );
}

export default App;