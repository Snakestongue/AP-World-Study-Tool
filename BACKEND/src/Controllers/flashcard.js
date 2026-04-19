import OpenAI from "openai";
export const flashcardGenerator =async(req, res)=>{
    const {content, select} = req.body;
    const models=[
        // "Qwen/Qwen2.5-7B-Instruct",
        // "meta-llama/Llama-3.2-1B-Instruct",
        // "mistralai/Mistral-7B-Instruct-v0.3"
        // "groq/compound"
        "Llama-3.3-70B-Instruct",
        "gpt-4o",
        "Mistral-large-2411"
    ];
    const githubAI = new OpenAI({
        apiKey:process.env.GITHUB_TOKEN, 
        baseURL:"https://models.inference.ai.azure.com"  
    });
    for (let modelId of models){
        try{
            const response = await githubAI.chat.completions.create({
                model:modelId,
                    messages:[
                {role: "system", content: "You are an AP World History Teacher and exam grader." },
                {role: "user", content: `
                    Using these notes: ${content}
                    Create AP World flashcards for this ${select} era.
                    Follow these strict format rules
                    1. Each flashcard must have a unique term and unique meaningful definition that explains its historical significance, role, or impact.  
                    2.DO not use the words "Term" or "Definition". Do not give the answer away in the term.
                    3. Use the information from the notes to generate definitions.
                    4.Format each flashcard as: Term :: Definition. Only use 1 :: per flashcard. Do not number the flashcards or use asterisks, dashes, or bullet points.
                    5. Avoid duplicate flashcards; each concept should appear only once.
                    6. Do not output empty definitions. Every term must have a full, meaningful definition based on the notes.
                `} 
            ],
                max_tokens:1000
            })   
            return res.json({result:response.choices[0].message.content})
        }catch(error){
            console.log(`Model ${modelId} failutres:`, error.message);
        }
    }
    res.status(500).json({message: "No models worked"});
};