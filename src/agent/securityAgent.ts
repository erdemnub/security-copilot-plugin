import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { createToolCallingAgent, AgentExecutor } from "langchain/agents";
import { deviceCveTool} from "./tools/deviceCveTool";

// LLM model for the agent
const llm = new ChatOllama({
    model: "qwen3:14b",
    temperature: 0
});

const tools = [deviceCveTool];

// SYSTEM PROMPT

const prompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `You are a security agent that helps users to identify and mitigate vulnerabilities in their devices.
        You have access to a tool that can check the CVE status of a device.
        If a device is found to be vulnerable, you should provide guidance on how to mitigate the vulnerability.
        If a device is not vulnerable, you should inform the user.
        `
    ],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
    new MessagesPlaceholder("agent_scratchpad"),
]);

const agent = createToolCallingAgent({
    llm,
    tools,
    prompt,
});

const agentExecutor = new AgentExecutor({
    agent,
    tools,
    verbose: true,
});

async function run() {
    const inputQuery = process.argv.slice(2).join(" ");

    console.log(`\n Check sending request "${inputQuery}" to the security agent..`);

    const result = await agentExecutor.invoke({
        input: inputQuery,
        chat_history: [],
    });

    console.log("\n Security agent response: ", result.output);
}

run().catch((err) => {
    console.error("Error running the security agent:", err.message);
});

