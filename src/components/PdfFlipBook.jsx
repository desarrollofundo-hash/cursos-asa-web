import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// 🔥 WORKER (ESTO ES CRÍTICO)
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function PdfFlipBook({ pdf }) {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setError(null);
  }

  function onLoadError(err) {
    console.error("PDF error:", err);
    setError("No se pudo cargar el PDF");
  }

  if (!pdf) {
    return <p className="text-white">No hay PDF cargado</p>;
  }

  return (
    <div className="w-full flex justify-center bg-black">
      <Document
        file={pdf}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading={<p className="text-white p-4">Loading PDF...</p>}
      >
        {error && <p className="text-red-400 p-4">{error}</p>}

        {numPages && (
          <HTMLFlipBook width={500} height={700} size="stretch" showCover>
            {Array.from({ length: numPages }, (_, i) => (
              <div key={i} className="bg-white flex justify-center">
                <Page
                  pageNumber={i + 1}
                  width={500}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
  );
}

export default PdfFlipBook;
