import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name,language } = req.body;
    const brevoApiUrl = "https://api.brevo.com/v3/contacts";
    try {
      const response = await axios.post(brevoApiUrl, {
        email: email,
        attributes: { FIRSTNAME: name, LANGUAGE:language },
        listIds: [5],
        updateEnabled: true
      }, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
        }
      });
      res.status(200).json({ message: "Email saved successfully." });
    } catch (error) {
      console.error("Error saving email in BREVO:", error.message);
      res.status(500).json({ message: "Error saving email. Please try again later." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
