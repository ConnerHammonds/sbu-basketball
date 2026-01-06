/**
 * Email template for reservation cancellation
 */
export function getReservationCancellationEmail({
  userName,
  userEmail,
  sectionName,
  seatNumber,
  rowNumber,
}: {
  userName: string;
  userEmail: string;
  sectionName: string;
  seatNumber: number;
  rowNumber: number;
}) {
  const subject = `Reservation Cancelled - Section ${sectionName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reservation Cancelled</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 40px;
    }
    .header {
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 3px solid #cc0000;
    }
    .header h1 {
      color: #cc0000;
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 30px 0;
    }
    .cancellation-box {
      background-color: #f9f9f9;
      border-left: 4px solid #666;
      padding: 20px;
      margin: 20px 0;
    }
    .cancellation-box h2 {
      margin-top: 0;
      color: #666;
      font-size: 20px;
    }
    .detail-row {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      font-weight: bold;
      color: #666;
      display: inline-block;
      width: 140px;
    }
    .detail-value {
      color: #333;
    }
    .footer {
      text-align: center;
      padding-top: 30px;
      border-top: 1px solid #eee;
      color: #999;
      font-size: 14px;
    }
    .button {
      display: inline-block;
      background-color: #cc0000;
      color: #ffffff !important;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 4px;
      margin: 20px 0;
      font-weight: bold;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏀 SBU Basketball</h1>
      <p style="margin: 10px 0 0 0; color: #666;">Reservation Cancelled</p>
    </div>
    
    <div class="content">
      <p>Hi ${userName},</p>
      
      <p>Your seat reservation has been successfully cancelled.</p>
      
      <div class="cancellation-box">
        <h2>Cancelled Reservation</h2>
        <div class="detail-row">
          <span class="detail-label">Section:</span>
          <span class="detail-value">${sectionName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Row:</span>
          <span class="detail-value">${rowNumber}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Seat:</span>
          <span class="detail-value">${seatNumber}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email:</span>
          <span class="detail-value">${userEmail}</span>
        </div>
      </div>

      <p>The seat is now available for others to reserve. If you'd like to make a new reservation, please visit our seating page.</p>
      
      <p style="margin-top: 30px;">We hope to see you at a future game!</p>
      <p style="margin: 5px 0;"><strong>SBU Basketball Team</strong></p>
    </div>
    
    <div class="footer">
      <p>This is an automated confirmation email.</p>
      <p>If you did not cancel this reservation, please contact us immediately.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
SBU Basketball - Reservation Cancelled

Hi ${userName},

Your seat reservation has been successfully cancelled.

CANCELLED RESERVATION:
- Section: ${sectionName}
- Row: ${rowNumber}
- Seat: ${seatNumber}
- Email: ${userEmail}

The seat is now available for others to reserve. If you'd like to make a new reservation, please visit our seating page.

We hope to see you at a future game!

SBU Basketball Team

---
This is an automated confirmation email.
If you did not cancel this reservation, please contact us immediately.
  `.trim();

  return { subject, html, text };
}
