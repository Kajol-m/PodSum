// src/api/podcast.ts
export async function uploadAudioFile(file: File) {
  const formData = new FormData();
  formData.append("audio", file);

  const res = await fetch("http://localhost:5000/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
  return res.json(); // { transcriptId }
}

export async function uploadLink(url: string) {
  const res = await fetch("http://localhost:5000/api/uploadLink", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
  return res.json(); // { transcriptId }
}

export async function getTranscriptStatus(id: string) {
  const res = await fetch(`http://localhost:5000/api/status/${id}`);
  if (!res.ok) throw new Error(`Status check failed: ${res.statusText}`);
  return res.json(); // { status, text? }
}

export async function summarizeTranscript(transcript: string) {
  const res = await fetch("http://localhost:5000/api/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript }),
  });

  if (!res.ok) throw new Error(`Summarize failed: ${res.statusText}`);
  return res.json(); // { summary }
}
