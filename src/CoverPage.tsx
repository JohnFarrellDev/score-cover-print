import { useParams, Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export function CoverPage() {
  const { songName, artistName, scoreLink, songLink } = useParams<{
    songName: string;
    artistName: string;
    scoreLink: string;
    songLink: string;
  }>();

  // Decode URL-encoded parameters
  const decodedSongName = decodeURIComponent(songName || "");
  const decodedArtistName = decodeURIComponent(artistName || "");
  const decodedScoreLink = decodeURIComponent(scoreLink || "");
  const decodedSongLink = decodeURIComponent(songLink || "");

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="max-w-2xl mx-auto">
        {decodedArtistName && (
          <h1 className="text-4xl font-bold mb-2">{decodedArtistName}</h1>
        )}
        {decodedSongName && (
          <h2 className="text-3xl mb-8">{decodedSongName}</h2>
        )}

        {decodedScoreLink && (
          <div className="mb-8">
            <p className="font-semibold">Score:</p>
            <p className="mb-2">{decodedScoreLink}</p>
            <QRCodeCanvas value={decodedScoreLink} size={128} />
          </div>
        )}

        {decodedSongLink && (
          <div className="mb-8">
            <p className="font-semibold">Spotify:</p>
            <p className="mb-2">{decodedSongLink}</p>
            <QRCodeCanvas value={decodedSongLink} size={128} />
          </div>
        )}

        <div className="mt-8 print:hidden">
          <Link to="/" className="text-blue-600 hover:underline mr-4">
            Back to Form
          </Link>
          <button
            onClick={() => window.print()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Print Cover Page
          </button>
        </div>
      </div>
    </div>
  );
}
