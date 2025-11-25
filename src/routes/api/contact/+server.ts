import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import axios from 'axios';
import {
	TELEGRAM_BOT_TOKEN,
	TELEGRAM_CHAT_ID,
	GMAIL_PASSKEY,
	EMAIL_ADDRESS
} from '$env/static/private';

// Create and configure Nodemailer transporter
const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: EMAIL_ADDRESS,
		pass: GMAIL_PASSKEY
	}
});

// Helper function to send a message via Telegram
async function sendTelegramMessage(
	token: string,
	chat_id: string,
	message: string
): Promise<boolean> {
	const url = `https://api.telegram.org/bot${token}/sendMessage`;
	try {
		const res = await axios.post(url, {
			text: message,
			chat_id
		});
		return res.data.ok;
	} catch (error) {
		console.error('Error sending Telegram message:', error);
		return false;
	}
}

// HTML email template
const generateEmailTemplate = (name: string, email: string, userMessage: string): string => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #0EA5E9;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #0EA5E9; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

// Helper function to send an email via Nodemailer
async function sendEmail(
	payload: { name: string; email: string; message: string },
	message: string
): Promise<boolean> {
	const { name, email, message: userMessage } = payload;

	const mailOptions = {
		from: 'Codefred Portfolio',
		to: EMAIL_ADDRESS,
		subject: `New Message From ${name}`,
		text: message,
		html: generateEmailTemplate(name, email, userMessage),
		replyTo: email
	};

	try {
		await transporter.sendMail(mailOptions);
		return true;
	} catch (error) {
		console.error('Error while sending email:', error);
		return false;
	}
}

export async function POST({ request }: RequestEvent) {
	try {
		const payload = await request.json();
		const { name, email, message: userMessage } = payload;

		// Validate environment variables
		if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
			return json(
				{
					success: false,
					message: 'Telegram token or chat ID is missing.'
				},
				{ status: 400 }
			);
		}

		if (!GMAIL_PASSKEY || !EMAIL_ADDRESS) {
			return json(
				{
					success: false,
					message: 'Email configuration is missing.'
				},
				{ status: 400 }
			);
		}

		// Validate request payload
		if (!name || !email || !userMessage) {
			return json(
				{
					success: false,
					message: 'Name, email, and message are required.'
				},
				{ status: 400 }
			);
		}

		const message = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;

		// Send Telegram message
		const telegramSuccess = await sendTelegramMessage(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, message);

		// Send email
		const emailSuccess = await sendEmail(payload, message);

		if (telegramSuccess && emailSuccess) {
			return json(
				{
					success: true,
					message: 'Message sent successfully!'
				},
				{ status: 200 }
			);
		}

		return json(
			{
				success: false,
				message: 'Failed to send message. Please try again.'
			},
			{ status: 500 }
		);
	} catch (error) {
		console.error('API Error:', error);
		return json(
			{
				success: false,
				message: 'Server error occurred.'
			},
			{ status: 500 }
		);
	}
}
