import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SongForm() {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [scoreLink, setScoreLink] = useState("");
  const [songLink, setSongLink] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedSongName = encodeURIComponent(songName);
    const encodedArtistName = encodeURIComponent(artistName);
    const encodedScoreLink = encodeURIComponent(scoreLink);
    const encodedSongLink = encodeURIComponent(songLink);

    navigate(
      `/cover/${encodedSongName}/${encodedArtistName}/${encodedScoreLink}/${encodedSongLink}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-indigo-400 print:text-black">
          Song Information
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg print:shadow-none print:bg-white"
        >
          <div>
            <label
              htmlFor="songName"
              className="block text-sm font-medium text-gray-300"
            >
              Song Name:
            </label>
            <input
              type="text"
              id="songName"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="artistName"
              className="block text-sm font-medium text-gray-300"
            >
              Artist Name:
            </label>
            <input
              type="text"
              id="artistName"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="scoreLink"
              className="block text-sm font-medium text-gray-300"
            >
              Link to Score:
            </label>
            <input
              type="url"
              id="scoreLink"
              value={scoreLink}
              onChange={(e) => setScoreLink(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="songLink"
              className="block text-sm font-medium text-gray-300"
            >
              Link to Song:
            </label>
            <input
              type="url"
              id="songLink"
              value={songLink}
              onChange={(e) => setSongLink(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="print:hidden">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate Cover Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
