import { createTransport } from 'nodemailer';

import config from '../config/environment';
import logger from '../utils/logger';

const { smtpConfig, brandName, from } = config.mailer;

const transport = createTransport(smtpConfig, { from: `"${brandName}" <${from}>` });

const mailer = {};

mailer.sendMail = async (letter) => {
  try {
    const info = await transport.sendMail(letter);
    logger.verbose(`Message ${info.messageId} sent: ${info.response} to ${letter.to}`);
  } catch (error) {
    logger.error(error.message);
  }
};

export default mailer;
