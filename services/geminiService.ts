
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectConfig, DockerizationResult, WebFramework } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateDockerSetup(config: ProjectConfig): Promise<DockerizationResult> {
    const prompt = `
      Act as a Senior DevOps Engineer. Generate a production-ready Dockerization setup for the following web application:
      - Framework: ${config.framework}
      - Project Name: ${config.projectName}
      - Database: ${config.database}
      - Use Nginx as Reverse Proxy: ${config.useNginx ? 'Yes' : 'No'}
      - Use Redis: ${config.useRedis ? 'Yes' : 'No'}
      - Python Version: ${config.pythonVersion}
      - App Entry Point: ${config.entryPoint}

      Requirements:
      1. Dockerfile: Use multi-stage builds for a smaller footprint. Ensure it runs as a non-root user.
      2. docker-compose.yml: Include services for the app, ${config.database !== 'None' ? config.database : ''}, ${config.useNginx ? 'Nginx' : ''}, and ${config.useRedis ? 'Redis' : ''}. Use healthchecks and volumes for persistence.
      3. ${config.useNginx ? 'nginx.conf: A secure Nginx configuration.' : ''}
      4. README.md: Clear steps to build and run the application.

      Respond in JSON format.
    `;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            files: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  content: { type: Type.STRING },
                  language: { type: Type.STRING }
                },
                required: ["name", "content", "language"]
              }
            },
            explanation: { type: Type.STRING }
          },
          required: ["files", "explanation"]
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}') as DockerizationResult;
    } catch (error) {
      console.error("Failed to parse Gemini response:", error);
      throw new Error("Failed to generate Docker configuration. Please try again.");
    }
  }
}
