const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateResponse = async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            // stop: ["\"\"\""],
        });

        const responseData = response.data.choices[0].text

        res.status(200).json({
            success: true,
            data: responseData
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: "Response could not be generated"
        })
    }
}

module.exports = { generateResponse }