import { useState, useRef } from "react";
import Button from "./Button";

interface LinkInputAreaProps {
  onFileUpload: (file: File) => void;
  onLinkSubmit?: (url: string) => void;
}

export default function LinkInputArea({ onFileUpload, onLinkSubmit }: LinkInputAreaProps) {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"upload" | "ready">("upload");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMode("ready");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) onFileUpload(file);
    else if (url.trim() && onLinkSubmit) onLinkSubmit(url.trim());
  };

  return (
    <div className="flex flex-col items-center">
      <p className="sm:text-5xl text-2xl font-extrabold text-white">Try it now</p>
      <p className="text-base md:text-lg text-xs text-white font-medium mb-2 pt-5 pb-5">
        Upload an audio file or paste any podcast URL
      </p>

      <div className="bg-[#16213e] w-full p-8 rounded-xl flex flex-col items-center gap-6">
        {mode === "upload" && (
          <>
  
            <div>
              <Button variant="primary" onClick={handleClick}>
        Choose File
      </Button>
      <input
        type="file"
        accept="audio/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden text-white" // hide the default file input completely
      />
            </div>
            <span className="text-gray-400">or</span>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste any audio URL"
              className="px-4 py-2 w-full max-w-lg bg-[#23235A] text-white rounded-lg placeholder:text-cyan-300"
            />
            {url.trim() && (
              <Button onClick={() => setMode("ready")} variant="primary">
                Next
              </Button>
            )}
          </>
        )}

        {mode === "ready" && (
          <form onSubmit={handleSubmit} className="w-full max-w-xl flex items-center justify-center gap-4">
            <Button type="submit" variant="primary">
              Summarize
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setMode("upload");
                setFile(null);
                setUrl("");
              }}
            >
              Change Input
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

