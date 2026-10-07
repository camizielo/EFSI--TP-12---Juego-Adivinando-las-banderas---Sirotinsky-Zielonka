
import { useGame } from "../context/GameContext";

function ScoreBoard() {
    const { score } = useGame();

    return (
        <h2>Puntaje: {score}</h2>
    );
}

export default ScoreBoard;