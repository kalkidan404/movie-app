
import { useEffect, useState } from "react";

import { Header } from "../components/header";
import { Footer } from "../components/footer";

const Downloads = () => {
    const [downloads, setDownloads] = useState([]);

    useEffect(() => {
        const getDownloads = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/downloads`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to get downloads"
                    );
                }

                setDownloads(data);
            } catch (error) {
                console.error(error);
            }
        };

        getDownloads();
    }, []);

    const removeDownload = async (id) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/downloads/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to remove download");
            }

            setDownloads(
                downloads.filter((download) => download.id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="downloads-page">

            <Header />

            <section className="downloads-header">

                <h4>Your Offline Library</h4>

                <h2>Downloads</h2>

                <p>
                    Movies you save appear here, ready to watch anywhere.
                </p>

            </section>

            <section className="downloaded-movies">

                {downloads.map((download) => (
                    <div
                        className="download-row"
                        key={download.id}
                    >

                        <img
                            src={
                                download.movie.backdropUrl ||
                                download.movie.posterUrl
                            }
                            alt={download.movie.title}
                        />

                        <div className="download-info">

                            <span className="downloaded-status">
                                Downloaded
                            </span>

                            <h3>{download.movie.title}</h3>

                            <div className="download-meta">

                                <span>
                                    {download.movie.genre || "Unknown genre"}
                                </span>

                                <span>
                                    {download.movie.language || "Unknown"}
                                </span>

                                <span>
                                    {download.movie.duration
                                        ? `${download.movie.duration} min`
                                        : "Unknown"}
                                </span>

                            </div>

                            <div className="download-file-info">

                                <span>Size: —</span>

                                <span>Quality: —</span>

                            </div>

                        </div>

                        <button
                            className="remove-download"
                            onClick={() => removeDownload(download.id)}
                        >
                            Remove
                        </button>

                    </div>
                ))}

            </section>

            <Footer />

        </div>
    );
};

export { Downloads };
