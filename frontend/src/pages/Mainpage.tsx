import { lazy, useState } from "react";
import {
  uploadAudioFile,
  getTranscriptStatus,
  summarizeTranscript,
} from "../api/podcast";

import FeatureCard from "../components/FeatureCard";
import Header from "../components/Header";
import Rocket from "../assets/rocket.png";
import Creative from "../assets/creativity.png";
import Microphone from "../assets/microphone.png";
import Button from "../components/Button";
import LinkInputArea from "../components/LinkInputArea";
import Footer from "../components/Footer";
const Result = lazy(() => import('../components/Result'));

const Mainpage: React.FC = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarizeFile = async (file: File) => {
    await handleSummarizeGeneric(async () => {
      const { transcriptId } = await uploadAudioFile(file);
      return await pollForTranscript(transcriptId);
    });
  };

//   const handleSummarizeLink = async (url: string) => {
//     await handleSummarizeGeneric(async () => {
//       const { transcriptId } = await uploadLink(url);
//       return await pollForTranscript(transcriptId);
//     });
//   };

  const handleSummarizeGeneric = async (getTranscript: () => Promise<string>) => {
    setLoading(true);
    setSummary("");
    try {
      const transcript = await getTranscript();
      const { summary } = await summarizeTranscript(transcript);
      setSummary(summary);
    } catch (error) {
      console.error("Summarize error:", error);
    } finally {
      setLoading(false);
    }
  };

  const pollForTranscript = async (id: string): Promise<string> => {
    while (true) {
      const statusData = await getTranscriptStatus(id);
      if (statusData.status === "completed") return statusData.text;
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  };

  return (
    <>
      <Header />
      <div className="text-center px-4 py-20 bg-gradient-to-br from-[#19172e] to-[#120026] flex flex-col items-center justify-center min-h-[6vh]" id="home">
        <p className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#72f3ff] via-[#ff79c6] to-[#a960ee] text-transparent bg-clip-text drop-shadow-[0_2px_32px_rgba(51,255,255,0.8)] p-3">
          Transform Podcasts into Insights
        </p>
        <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mb-10">
          Get AI-powered summaries of your favorite podcasts in seconds.
        </p>
        <div className="flex gap-6 justify-center mt-4">
          <Button
            variant="primary"
            onClick={() =>
              document.getElementById("linkInput")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Try Free Now
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Learn More
          </Button>
        </div>
      </div>

      <div className="features flex flex-col items-center p-8 bg-[#0f0f23]" id="features">
        <p className="sm:text-5xl font-extrabold sm:p-[50px] pb-[50px] text-white text-2xl">
          Why Choose Podsum?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[75px] pb-[50px]">
          <FeatureCard imageUrl={Rocket} title="Lightning Fast" description="Get comprehensive summaries in under 60 seconds." altText="Lightning Fast" />
          <FeatureCard imageUrl={Creative} title="Smart Insights" description="Key takeaways, quotes, and action items automatically extracted." altText="Smart Insights" />
        <div className="md:col-span-2 lg:col-span-1 md:flex md:justify-center">
          <FeatureCard imageUrl={Microphone} title="Any Platform" description="Works with Spotify, Apple Podcasts, YouTube, and more." altText="Any Platform" />
        </div>
        </div>

        <div className="upload-audio-links sm:p-[50px] p-1 w-full" id="linkInput">
          <LinkInputArea onFileUpload={handleSummarizeFile} />
          {/* onLinkSubmit={handleSummarizeLink} */}
          {loading && <p className="text-white mt-4">Processing...</p>}
          {summary && <Result initialText={summary} />}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Mainpage;
