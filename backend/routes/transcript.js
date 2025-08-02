const express = require('express');
const multer= require('multer');
const path = require('path');

const { uplaodAudio, transcribeAudio, getTranscriptionResult } = require('../controllers/speechToText');
const { summarizeTranscript } = require('../controllers/summarizer');   

const router = express.Router();
const upload=multer({dest: 'uploads/'});

router.post("/upload",
    upload.single("audio"), async (req,res)=>{
        try{
            const filePath=req.file.path;
            const audioUrl=await uplaodAudio(filePath);
            const transcriptId=await transcribeAudio(audioUrl);
            res.status(200).json({transcriptId});//"transcriptId": "08bdccd6-b05b-40e2-b889-27847b37cb47"
        }catch(error){
            console.error("Error uploading audio:", error);
            res.status(500).json({error:"Failed to upload audio"});
        }
    }
);

router.get("/status/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await getTranscriptionResult(id);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching transcription status:", error);
        res.status(500).json({ error: "Failed to fetch transcription status" });
    }
});

router.post("/summarize", async (req, res) => {
    const { transcript } = req.body;
    try {
        const summary = await summarizeTranscript(transcript);
        res.status(200).json({ summary });
    } catch (error) {
        console.error("Error summarizing transcript:", error);
        res.status(500).json({ error: `Failed to summarize transcript, ${error.message}` });
    }
});

module.exports = router;
