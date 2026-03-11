import axios from "axios";
export const flashcardGenerator =async(req, res)=>{
    const {content, select} = req.body;
    if (!content||!select){ 
        return res.status(400).json({message: "Fill out all fields" });
    }
    console.log(select)
    const models = [
        "Qwen/Qwen2.5-7B-Instruct",
        "meta-llama/Llama-3.2-1B-Instruct",
        "mistralai/Mistral-7B-Instruct-v0.3"
    ]; //ai found the models :)
    for (let modelId of models){
        try{
            let response = await axios.post(
                "https://router.huggingface.co/v1/chat/completions",{ 
                    model:modelId,
                    messages: [
                        {role: "system", content: "You are an AP World History Teacher and exam grader." },
                        {role: "user", content: `
                        Using these notes: ${content}
                        Create AP World flashcards for this${select} era.
                        Follow these strict format rules
                        1. Each flashcard must have a unique term and unique meaningful definition that explains its historical significance, role, or impact.  
                        1a.DO not use the words "Term" or "Definition". Do not give the answer away in the term.
                        2. Use the information from the notes to generate definitions. If a term appears in the notes, summarize its importance, causes, or consequences.
                        3. Includ e historically important people, events, or places from the notes, and make sure all information is historically accurate.
                        4.Format each flashcard as: Term :: Definition
                        5. Do not number the flashcards or use asterisks, dashes, or bullet points.
                        6.Keep each definition concise and focused on key historical significance.
                        7. Avoid duplicate flashcards; each concept should appear only once.
                        8. Include dates or time periods in the term when relevant.
                        9. Do not output empty definitions. Every term must have a full, meaningful definition based on the notes.
                        `} 
                    ],
                     max_tokens:1000
                },{
                    headers: {
                        Authorization: `Bearer ${process.env.token}`,
                        "Content-Type": "application/json"
                }},
            );
            return res.json({result:response.data.choices[0].message.content});
        }catch (error){
            console.log(`Model ${modelId} failutres:`, error.message);
        }
    }
    res.status(500).json({message: "No models worked"});
};