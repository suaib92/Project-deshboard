import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const exportGist = async (req, res) => {
  const { title, todos } = req.body;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!title || !todos) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const content = `
# ${title}
## Todos
${todos.map((t) => `- ${t}`).join('\n')}
`;

  try {
    const response = await axios.post(
      'https://api.github.com/gists',
      {
        files: {
          [`${title}.md`]: { content },
        },
      },
      {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
      }
    );

    // Ensure the exports directory exists
    const exportDir = path.join(__dirname, '../exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir); // Create the directory if it doesn't exist
    }

    const filePath = path.join(exportDir, `${title}.md`);
    fs.writeFileSync(filePath, content); // Write the file

    res.status(200).json({ url: response.data.html_url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
