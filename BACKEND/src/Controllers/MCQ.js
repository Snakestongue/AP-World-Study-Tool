import OpenAI from "openai";
export const questionGenerator =async(req, res)=>{
    const {content, select} = req.body;
    const githubAI = new OpenAI({
        apiKey: process.env.GITHUB_TOKEN, 
        baseURL:"https://models.inference.ai.azure.com" 
    })
    console.log(select)
    const models=[
        // "Qwen/Qwen2.5-7B-Instruct",
        // "meta-llama/Llama-3.2-1B-Instruct",
        // "mistralai/Mistral-7B-Instruct-v0.3"
        // "groq/compound"
        "Llama-3.3-70B-Instruct",
        "gpt-4o",
        "Mistral-large-2411"
    ];
    for (let modelId of models) {
        try{
            const response = await githubAI.chat.completions.create({
                    model:modelId,
                    messages: [
                        {role: "system", content: "You are an expert AP World History Teacher and exam writer. You generate questions that resemble official AP World History exam questions." },
                        {role: "user", content: `
                        Using these notes: ${content}

                        Generate 5 AP World History Multiple Choice Questions for this ${select} era.

                        Requirements:
                        Questions should focus on higher-order thinking skills such as causation, comparison, continuity and change over time, and regional or global interactions.
                        Avoid simple factual recall.
                        Include historically plausible distractors. Incorrect answers should be historically believable.
                        At least 3 questions must include a stimulus. The stimulus can be a short historical excerpt, policy description, traveler observation, historical scenario, or historian interpretation.
                        Do not invent events, dates, or outcomes. If information is missing from the notes, rely only on well-established historical facts.
                        Cover different aspects (political, economic, social, cultural, global connections) when possible.

                        Formatting Rules:
                        Do not use bullets, asterisks, or dashes in any part of the questions or answers.
                        Write questions in authentic AP World History phrasing.
                        Use this format:
                        For each question, list the four answer choices (A, B, C, D) **once** immediately after the question. 
                        Do not repeat these choices anywhere else.
                        After all questions, write the: Answer Key and Explanations using this format
                        In the Answer Key and Explanations section, DO NOT repeat the answer choices. 
                        Only list the correct letter and a short explanation.
                        `}
                    ],
                    max_tokens:1000
                }
            );
            return res.json( {result:response.choices[0].message.content});
        }catch (error){
            console.log(`Model ${modelId} failutres:`, error.message);
        }
    }
    res.status(500).json({message: "No models worked"});
};
//old prompts
// 1. Each question should have 4 answer choices. All the answers must be provided at the bottom, after all questions have been given. Explain the answer as well.
//                         2. Questions must test high order historical thinking skills often used on the AP world exam. This includes but is NOT
//                             limited to causation , comparsion, continity and change over time, hisotical content or global or regional interactions
//                         3. Avoid simple factual recall. Each question should require reasoning or interpretation.
//                         4.Include plausable distractors such as incorrect answers that are historically correct or partially correct answers that are overall inaccurate.
//                         5.Include the historical context or trends necessary to answer the question.
//                         6.Cover multiple aspects of the a selected topic(political, economic, social, cultural,or global connections) when possible."
//                         7. Use historically accurate information. Do not oversimplify choices, invent events or put incorrect outcomes
//                         8. At least 4 questions should include historical stimulus source such as excerpts, hisotircal scnarios/observations or polcicy descriptions.
//                         Styling
//                         1. No bullet symbols, dashes or astriks should be utilized
//                         2.Use authentic AP-stype phrasing used in AP World Exams