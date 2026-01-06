import { Resend } from 'resend';

// Email configuration
export const emailConfig = {
  from: 'SBU Basketball <onboarding@resend.dev>', // Update this when you verify your domain
  replyTo: 'support@example.com', // Update with your support email
};

// Lazy initialize Resend client
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not defined in environment variables');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

// Helper function to send emails with error handling
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const resend = getResendClient();
    
    const { data, error } = await resend.emails.send({
      from: emailConfig.from,
      to,
      subject,
      html,
      text,
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error sending email:', error);
    return { success: false, error };
  }
}
