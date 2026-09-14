import { tool } from "@langchain/core/tools";
import { z } from "zod";

const DeviceInputSchema = z.object({
  hostname: z.string().describe("What is the hostname of the device you want to check for CVEs? Like: PC-001"),
});

export const deviceCveTool = tool(
    async ({ hostname }) => {
        try {
            // Ping the Fastify API to get CVE information for the given hostname.
            const response = await fetch(
                `http://localhost:3000/analyze-device?hostname=${encodeURIComponent(hostname)}`,
            );
            if (!response.ok) {
                return `Error: Failed to fetch CVE information from the API. ${response.status}`;
            }

            const data = await response.json();
            return JSON.stringify(data, null, 2);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            return `Error: Failed to connect: ${message}`;
        }
    },
    {
        name: "analyze_device_cves",
        description: "A tool for checking CVEs on a device by hostname",
        schema: DeviceInputSchema,
    },
);