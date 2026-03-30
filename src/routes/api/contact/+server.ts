import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

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

export async function POST({ request }: RequestEvent) {
	try {
		const payload = await request.json();
		const { name, email, message: userMessage } = payload;

		const RESEND_API_KEY = env.RESEND_API_KEY;
		const EMAIL_ADDRESS = env.EMAIL_ADDRESS;

		if (!RESEND_API_KEY || !EMAIL_ADDRESS) {
			return json(
				{ success: false, message: 'Email configuration is missing.' },
				{ status: 400 }
			);
		}

		if (!name || !email || !userMessage) {
			return json(
				{ success: false, message: 'Name, email, and message are required.' },
				{ status: 400 }
			);
		}

		const resend = new Resend(RESEND_API_KEY);
		const { error } = await resend.emails.send({
			from: 'Codefred Portfolio <onboarding@resend.dev>',
			to: EMAIL_ADDRESS,
			subject: `New Message From ${name}`,
			text: `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}`,
			html: generateEmailTemplate(name, email, userMessage),
			replyTo: email
		});

		if (error) {
			console.error('Resend error:', error);
			return json(
				{ success: false, message: 'Failed to send message. Please try again.' },
				{ status: 500 }
			);
		}

		return json(
			{ success: true, message: 'Message sent successfully!' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('API Error:', error);
		return json(
			{ success: false, message: 'Server error occurred.' },
			{ status: 500 }
		);
	}
}
