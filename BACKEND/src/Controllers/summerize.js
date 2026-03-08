import axios from "axios";
export const summerizeNotes =async(req, res)=>{
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
    for (let modelId of models) {
        try{
            let response = await axios.post(
                "https://router.huggingface.co/v1/chat/completions",{ 
                    model:modelId,
                    messages: [
                        {role: "system", content: "You are an AP World History Teacher and exam grader." },
                        {role: "user", content: `In the ${select} time period summerize the following AP World History notes into a clear, concise format. Highlight clearly, key events, dates, peoples & concepts. Focus on major empires, people, themes and cause-effect relationships. If the notes and time period do not match only respond with "Notes and Time Period are not matching". If the student types in a non-existing event say "N/A". Make sure the notes are of quality for a 5 on the AP Exam. Here are the notes ${content}` }
                    ]
                },{
                    headers: {
                        Authorization: `Bearer ${process.env.token}`,
                        "Content-Type": "application/json"
                }}
            );
            return res.json({result:response.data.choices[0].message.content});
        }catch (error){
            console.log(`Model ${modelId} failutres:`, error.message);
        }
    }
    res.status(500).json({message: "No models worked"});
};