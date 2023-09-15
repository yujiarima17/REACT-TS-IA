import { FastifyInstance } from "fastify/types/instance";
import { prisma } from "../lib/prisma";

export async function getAllPromptsRoute(app: FastifyInstance) {
  app.get("/prompt", async (req, res) => {
    const prompts = await prisma.prompt.findMany();
    return prompts;
  });
}
