import { GoogleGenAI } from "@google/genai";

const fileToInlineData = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const transcribeAudio = async (file: File): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing in environment variables.");
    }

    const ai = new GoogleGenAI({ apiKey });
    const base64Data = await fileToInlineData(file);

    // Using gemini-3-flash-preview as it is multimodal capable and fast for this task
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: file.type,
              data: base64Data
            }
          },
          {
            text: `Please transcribe the following audio file into text. 
            - If the audio is in Korean, transcribe it in Korean.
            - Provide ONLY the transcription text. 
            - Do not add any introductory or concluding remarks.
            - Do not include timestamps unless specifically mentioned in the audio format.
            - Format it as clean, readable paragraphs.`
          }
        ]
      }
    });

    return response.text || "No transcription generated.";
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error("음성 파일을 변환하는 중에 오류가 발생했습니다. 파일 형식을 확인하거나 나중에 다시 시도해주세요.");
  }
};