
import { useGame } from "../context/GameContext";

function Flag() {
    const { currentCountry, loading, error } = useGame();

    if (loading) {
        return <p>Cargando países...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!currentCountry) {
        return <p>No se pudo cargar una bandera.</p>;
    }

    return (
        <div>
            <img
                src={currentCountry.flag}
                alt="Bandera para adivinar"
                width="300"
            />
        </div>
    );
}

export default Flag;