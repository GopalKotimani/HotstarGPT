import { GoogleGenAI } from "@google/genai";
import { GEMENI_API_KEY } from "./constants";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const openai = new GoogleGenAI({
    apiKey: GEMENI_API_KEY
});

export default openai;