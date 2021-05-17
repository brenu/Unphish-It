import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCircleNotch, FaCog, FaUserSecret } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";

import "./styles.css";

export default function Result() {
    const [results, setResults] = useState([]);
    const [topScores, setTopScores] = useState([]);
    const [lastReports, setlastReports] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        async function handleSearch() {
            try {
                const search = new URLSearchParams(location.search).get("search");

                const mainResponse = await axios.get(`https://phishstats.info:2096/api/phishing?_where=(url,like,~${search}~)&_sort=-id`);
                
                if (mainResponse.data){
                    setResults(mainResponse.data);
                }

                const topScoresResponse = await axios.get(`https://phishstats.info:2096/api/phishing?_sort=-score`);
            
                if (topScoresResponse.data){
                    setTopScores(topScoresResponse.data);
                }

                const lastReportsResponse = await axios.get("https://phishstats.info:2096/api/phishing?_where=(countrycode,eq,br)&_sort=-date");

                if(lastReportsResponse.data){
                    setlastReports(lastReportsResponse.data);
                }

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setHasError(true);
            }
        }

        handleSearch();
    }, []);

    function handleGoBack() {
        history.goBack();
    }

    return (
        <div className="container">
            <div className="content-header">
                <button onClick={() => handleGoBack()}>
                    <FaArrowLeft size="2.5rem" color="#FFF" />
                </button>
            </div>
            <div className="content-row">
                {isLoading && (
                    <FaCog className="spin" color="#FFF" size="5rem" />
                )}

                {hasError && (
                    <h1 id="results-title">Houve um erro durante a requisição :(</h1>
                )}

                {!isLoading && !hasError && (
                    <>
                        <div className="side-content">
                            <h2>Maiores Scores</h2>
                            {topScores.map(result => (
                                <div className="side-content-item" key={result.id}>
                                    <span>{result.host}</span>
                                </div>
                            ))}
                        </div>
                        <div id="main-content">
                            <FaUserSecret color="#FFF" size="15.1rem" />
                            <h1 id="results-title">O que encontramos</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>HOST</th>
                                        <th>NOTA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map(result => (
                                        <tr key={result.id}>
                                            <td>{result.host}</td>
                                            <td className={result.score >= 8 ? "critical" : (result.score >= 5 ? "alert" : "") }>{result.score || "N/A"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="side-content">
                            <h2>Recentes no Brasil</h2>
                            {lastReports.map(result => (
                                <div className="side-content-item" key={result.id}>
                                    <span>{result.host}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}