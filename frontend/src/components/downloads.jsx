const DownloadMovie = async (movieId) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/downloads/${movieId}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to download movie"
            );
        }

        return data;
    } catch (error) {
        console.error(error);
    }
};

export { DownloadMovie };