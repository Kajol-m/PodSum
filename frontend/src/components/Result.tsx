import { useState } from "react";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph } from "docx";
import Button from "./Button";
import { AiOutlineClose } from "react-icons/ai";

export default function ApiResultBox({ initialText }: { initialText: string }) {
  const [output] = useState(initialText);
//   const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

//   const callApi = async () => {
//     setLoading(true);
//     try {
//       // Simulated API call — replace with your actual request
//       const res = await new Promise((resolve) =>
//         setTimeout(() => resolve({ data: "This is API output text" }), 1000)
//       );
//       setOutput((res as { data: string }).data);
//     } catch (error) {
//       console.error("API Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard!");
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text(output, 10, 10);
    doc.save("output.pdf");
  };

  const downloadWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [new Paragraph(output)],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "output.docx");
  };

  if (!visible) return null;

  return (
    <div className="pt-6 ">
      {output && (
        <div className="mt-6 border rounded-lg shadow-lg p-4 bg-[#16213e]">
          {/* Buttons row */}
          <div className="flex gap-5 mb-3">
            <button
            onClick={() => setVisible(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <AiOutlineClose size={20} />
          </button>
            <Button
              onClick={copyToClipboard}
              className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
            >
              Copy
            </Button>
            <Button
              onClick={downloadPdf}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            >
              PDF
            </Button>
            <Button
              onClick={downloadWord}
              className="bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600"
            >
              Word
            </Button>
          </div>

          {/* Text area */}
          <textarea
            className="w-full h-100 p-4 rounded resize-none bg-white pb-8"
            value={output}
            readOnly
          />
        </div>
      )}
    </div>
  );
}
