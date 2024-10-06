import { z } from "zod";

const configSchema = z.object({
    NEXT_PUBLIC_WORKER_PLATFORM_API_URL: z.string(),
    NEXT_PUBLIC_WORKER_PLATFORM_API_KEY: z.string(),
    NEXT_PUBLIC_API_ENDPOINT: z.string(),
})

const configProject = configSchema.safeParse(process.env);

if (!configProject.success) {
    console.error(configProject.error);
    throw new Error("Invalid environment variables");
}

const envConfig = configProject.data;

export default envConfig;