import OpenAI from "openai";
export const summerizeNotes =async(req, res)=>{
    const {content, select} = req.body;
    console.log(select)
    const githubAI = new OpenAI({
        apiKey: process.env.GITHUB_TOKEN, 
        baseURL: "https://models.inference.ai.azure.com" 
    });
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
                        {role: "system", content: "You are an AP World History Teacher and exam grader." },
                        {role: "user", content: `In the ${select} time period summerize the following AP World History notes into a clear, concise format. 
                        Highlight clearly, key events, dates, peoples & concepts. Do not use astriks
                        Focus on major empires, people, themes and cause-effect relationships highlighted in the AP World History Curriculum.
                        If the notes and time period do not match only respond with "Notes and Time Period are not matching". Do not say anything else.
                        If the student types in a non-existing event say "N/A". 
                        Make sure the summerazied notes are historically acurate.
                        If the notes span beyond the selected time period, explain the entire event. 
                            EX: Ottoman Empire in 1750-1900
                        
                        Make sure the notes are of quality for a 5 on the AP Exam. Here are the notes ${content}` }
                    ]
                }
            );
            return res.json({result:response.choices[0].message.content})
        }catch (error){
            console.log(`Model ${modelId} failutres:`, error.message);
        }
    }
    res.status(500).json({message: "No models worked"});
};