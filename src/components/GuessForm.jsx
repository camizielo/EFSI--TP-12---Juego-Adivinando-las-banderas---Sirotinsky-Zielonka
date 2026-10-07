
import { useState } from "react";
import { useGame } from "../context/GameContext";

function GuessForm() {
    const [answer, setAnswer] = useState("");
    const [message, setMessage] = useState("");

    const { guess, loading, error } = useGame();

    function handleSubmit(event) {
        event.preventDefault();

        if (answer.trim() === "") {
            setMessage("Escribí el nombre de un país.");
            return;
        }

        const correct = guess(answer);

        if (correct) {
            setMessage("¡Correcto! Sumaste 10 puntos.");
        } else {
            setMessage("Incorrecto. Perdiste 1 punto. ¡Probá otra vez!");
        }

        setAnswer("");
    }

    if (loading || error) {
        return null;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                    placeholder="Escribí el país"
                />

                <button type="submit">Adivinar</button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default GuessForm;