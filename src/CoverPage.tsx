import { useSearchParams, Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useState, useEffect } from "react";

export function CoverPage() {
  const [searchParams] = useSearchParams();
  const songName = searchParams.get("songName") || "";
  const artistName = searchParams.get("artistName") || "";
  const scoreLink = searchParams.get("scoreLink") || "";
  const songLink = searchParams.get("songLink") || "";
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleShare = async () => {
    const shareData = {
      title: `${artistName} - ${songName}`,
      text: `Check out this cover page for ${songName} by ${artistName}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 text-white p-8 print:bg-white print:bg-gradient-to-br print:from-white  print:to-white print:text-black">
      <div className="max-w-2xl mx-auto bg-white text-black rounded-lg shadow-lg p-8 print:shadow-none">
        {artistName && (
          <h1 className="text-4xl font-bold mb-2 text-purple-600 print:text-black">
            {artistName}
          </h1>
        )}
        {songName && (
          <h2 className="text-3xl mb-8 text-blue-600 print:text-black">
            {songName}
          </h2>
        )}

        {(scoreLink || songLink) && (
          <div className="grid grid-cols-1 gap-8">
            {scoreLink && (
              <div className="bg-gray-100 p-4 print:p-0 rounded-lg print:bg-white">
                <p className="font-semibold text-lg mb-2">Score:</p>
                <p className="mb-4 break-all">{scoreLink}</p>
                <QRCodeCanvas
                  value={scoreLink}
                  size={128}
                  className="mx-auto print:mx-0"
                />
              </div>
            )}

            {songLink && (
              <div className="bg-gray-100 p-4 print:p-0 rounded-lg print:bg-white">
                <p className="font-semibold text-lg mb-2">Spotify:</p>
                <p className="mb-4 break-all">{songLink}</p>
                <QRCodeCanvas
                  value={songLink}
                  size={128}
                  className="mx-auto print:mx-0"
                />
              </div>
            )}
          </div>
        )}

        <div className="mt-8 print:hidden grid grid-cols-1 md:grid-cols-3 gap-4 justify-between items-center">
          <Link
            to="/"
            className="flex-1 text-center text-blue-600 hover:underline"
          >
            Back to Form
          </Link>
          <button
            onClick={handleShare}
            className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Share
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300"
          >
            Print Cover Page
          </button>
        </div>
      </div>
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          URL copied to clipboard!
        </div>
      )}
    </div>
  );
}
