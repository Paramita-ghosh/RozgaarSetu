import vision from '@google-cloud/vision';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const serviceAccount = require("./serviceAccountKey.json");

const visionClient = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key,
  },
  projectId: serviceAccount.project_id,
});

export default visionClient;