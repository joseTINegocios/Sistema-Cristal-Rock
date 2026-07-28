import { GoogleGenAI } from '@google/genai';

// Safe lazy initialization for client/server
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI | null {
  if (!aiClient) {
    // Vite client-side or environment process check
    const apiKey = typeof process !== 'undefined' && process.env ? process.env.GEMINI_API_KEY : undefined;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

export async function generateCoverIdea(prompt: string, style: string): Promise<{ title: string; subtitle: string; description: string }> {
  const client = getAIClient();
  if (client) {
    try {
      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an AI catalog creative director. Given the art direction prompt: "${prompt}" and style "${style}", generate a catalog cover title (1-3 words), subtitle (e.g. "Collection 2024" or similar), and a concise 1-sentence description.
Respond strictly in valid JSON format:
{
  "title": "Title Here",
  "subtitle": "Subtitle Here",
  "description": "Short poetic description here"
}`,
      });

      const text = response.text || '';
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return parsed;
    } catch (e) {
      console.warn('Gemini API call fallback:', e);
    }
  }

  // Fallback defaults if API key is not present or error occurs
  return {
    title: prompt.split(' ')[0] ? `${prompt.split(' ')[0].toUpperCase()} TIMELESS` : 'WINTER TIMELESS',
    subtitle: 'COLLECTION 2026',
    description: `A curated selection of ${style.toLowerCase()} horological excellence for the modern enterprise season.`
  };
}

export async function autoMapFields(sourceFields: string[], targetFields: string[]): Promise<Record<string, string>> {
  const client = getAIClient();
  if (client) {
    try {
      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Map these source API fields: ${JSON.stringify(sourceFields)} to the target schema fields: ${JSON.stringify(targetFields)}. Return a JSON map where key is source field and value is target field.`,
      });

      const text = response.text || '';
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (e) {
      console.warn('Gemini autoMap error:', e);
    }
  }

  // Fallback map
  return {
    product_uid: 'id_hash',
    display_name_en: 'product_title',
    base_price_usd: 'unit_cost',
    stock_level: 'inventory_count',
    category_l1: 'taxonomy_ref'
  };
}
