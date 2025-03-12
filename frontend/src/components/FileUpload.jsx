import { useState } from "react";

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [language, setLanguage] = useState("fr"); // Default Francese
    const [status, setStatus] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setStatus("Seleziona un file prima di inviare.");
            return;
        }

        setStatus("Caricamento in corso...");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("language", language);

        try {
            const response = await fetch("http://localhost:3000/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Errore durante l'upload");

            const data = await response.json();
            setStatus(`File caricato con successo! Chiavi da tradurre: ${data.keys.length}`);
        } catch (error) {
            setStatus("Errore durante l'upload del file.");
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-xl font-bold mb-4">Carica il file di traduzione</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="file"
                    accept=".js,.php"
                    onChange={handleFileChange}
                    className="block w-full p-2 border rounded-md"
                />

                <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="block w-full p-2 border rounded-md"
                >
                    <option value="fr">Francese</option>
                    <option value="de">Tedesco</option>
                    <option value="es">Spagnolo</option>
                </select>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Invia file
                </button>
            </form>

            {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
        </div>
    );
}