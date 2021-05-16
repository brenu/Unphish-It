import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./styles.css";

export default function Home() {
    const [search, setSearch] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        console.log("Requisição enviada!");
    }

    return (
        <div className="container center">
            <h1>Unphish-It</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div id="search-input-container">
                    <label htmlFor="search">Buscar Página Suspeita</label>
                    <input 
                        type="text" 
                        name="search" 
                        id="search" 
                        value={search} 
                        onChange={(event) => setSearch(event.target.value)} 
                        placeholder="Pesquise uma página suspeita"
                    />
                    <button type="submit">
                        <FaSearch color="#FFF" size="2.5rem" />
                    </button>
                </div>
           </form>
        </div>
    );
}