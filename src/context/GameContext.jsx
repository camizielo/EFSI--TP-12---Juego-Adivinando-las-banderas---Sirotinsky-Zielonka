
import { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
    const [countries, setCountries] = useState([]);
    const [currentCountry, setCurrentCountry] = useState(null);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudieron cargar los países");
                }

                return response.json();
            })
            .then((data) => {
                const countryList = data.data;

                setCountries(countryList);

                const randomCountry =
                    countryList[Math.floor(Math.random() * countryList.length)];

                setCurrentCountry(randomCountry);
                setLoading(false);
            })
            .catch(() => {
                setError("No se pudieron cargar los países. Revisá tu conexión.");
                setLoading(false);
            });
    }, []);

    function nextCountry() {
        if (countries.length === 0) {
            return;
        }

        let randomCountry;

        do {
            randomCountry =
                countries[Math.floor(Math.random() * countries.length)];
        } while (
            countries.length > 1 &&
            randomCountry.name === currentCountry?.name
        );

        setCurrentCountry(randomCountry);
    }

    function guess(countryName) {
        if (!currentCountry || !countryName.trim()) {
            return false;
        }

        if (
            countryName.trim().toLowerCase() ===
            currentCountry.name.trim().toLowerCase()
        ) {
            setScore((previousScore) => previousScore + 10);
            nextCountry();
            return true;
        } else {
            setScore((previousScore) => previousScore - 1);
            return false;
        }
    }

    return (
        <GameContext.Provider
            value={{
                countries,
                currentCountry,
                score,
                loading,
                error,
                guess,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    return useContext(GameContext);
}