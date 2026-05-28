import { useEffect, useState } from "react";
import HTMLFlipBook from "@vuvandinh203/react-flipbook";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

const FlipBookPDF = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(0);
  const [pdfRatio, setPdfRatio] = useState(0.7); // Aspect ratio por defecto (parado)
  const [bookSize, setBookSize] = useState({
    width: 600,
    height: 850,
  });

  const updateBookSize = (ratio) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // móvil
      const w = 320;
      setBookSize({
        width: w,
        height: Math.round(w / ratio),
      });
    } else {
      // PC
      // Si el PDF es horizontal (hechado / ratio > 1), usamos una proporción landscape
      // Si el PDF es vertical (parado / ratio <= 1), usamos proporción portrait
      const w = ratio > 1 ? 850 : 600;
      setBookSize({
        width: w,
        height: Math.round(w / ratio),
      });
    }
  };

  const onDocumentLoadSuccess = async (pdf) => {
    setNumPages(pdf.numPages);
    try {
      const page = await pdf.getPage(1);
      const { width, height } = page.getViewport({ scale: 1.0 });
      const ratio = width / height;
      setPdfRatio(ratio);
      updateBookSize(ratio);
    } catch (error) {
      console.error("Error loading page dimensions:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      updateBookSize(pdfRatio);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pdfRatio]);

  return (
    <div className="flex justify-center w-full py-5">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {numPages > 0 && (
          <HTMLFlipBook
            width={bookSize.width}
            height={bookSize.height}
            minWidth={250}
            maxWidth={1200}
            minHeight={300}
            maxHeight={1400}
            showCover={true}
            className="shadow-2xl rounded-xl overflow-hidden"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={index}
                className="bg-white flex items-center justify-center overflow-hidden"
              >
                <Page
                  pageNumber={index + 1}
                  width={bookSize.width}
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
};

export default FlipBookPDF;