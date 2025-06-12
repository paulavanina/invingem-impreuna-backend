import { OpenAI } from "openai";
const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: apiKey });

const chatbotController = async (req, res) => {
    const { question } = req.body;
    const response = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                    "Ești un asistent virtual empatic care oferă sprijin emoțional și informații utile pacienților care suferă de cancer și se confruntă cu depresie, anxietate sau alte stări emoționale.Răspunde în limba română cu blândețe, compasiune. Scopul tău este să oferi sprijin emoțional, să oferi informații educative despre cancer, sănătate mintală, să încurajezi pacienții să caute ajutor profesional  dacă utilizatorul exprimă stări de copleșire profundă.",
            },
            {
                role: "user",
                content: question,
            },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 300,
    });

    res.send(response.choices[0].message.content);
};

export default chatbotController;