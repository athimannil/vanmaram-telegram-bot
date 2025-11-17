import axios from "axios";

export interface DictionaryResponse {
  word: string;
  meaning: string[];
  source: string;
}

export const getMeaning = async (word: string): Promise<DictionaryResponse> => {
  const isEnglish = /^[a-zA-Z0-9\s]+$/.test(word);
  const url = `${process.env.API_URL}/meaning/${
    isEnglish ? "english" : "malayalam"
  }/${encodeURIComponent(word)}`;

  try {
    const response = await axios.get<DictionaryResponse>(url);

    if (response.data && response.data.meaning) {
      return response.data;
    } else {
      throw new Error("No meaning found for this word.");
    }
  } catch (error) {
    throw new Error("Something went wrong. Please try again.");
  }
};
