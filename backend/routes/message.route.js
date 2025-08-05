import express from 'express';
import { sendSMS, receiveSMS, uploadContacts } from '../controllers/messageController.js';
const router = express.Router();

router.post('/send', sendSMS);
router.post('/receive', receiveSMS);
router.post('/contacts/upload', uploadContacts);

export default router;
