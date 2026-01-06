/**
 * Email template for seat reservation confirmation
 */
export function getReservationConfirmationEmail({
  userName,
  userEmail,
  seats,
  reservationDate,
}: {
  userName: string;
  userEmail: string;
  seats: Array<{
    sectionName: string;
    seatNumber: number;
    rowNumber: number;
  }>;
  reservationDate: string;
}) {
  const totalSeats = seats.length;
  const subject = totalSeats === 1 
    ? `Seat Reservation Confirmed - Section ${seats[0].sectionName}`
    : `${totalSeats} Seats Reserved - SBU Basketball`;

  // Generate seat list HTML
  const seatsListHtml = seats.map((seat, index) => `
        <div class="detail-row">
          <span class="detail-label">Seat ${index + 1}:</span>
          <span class="detail-value">${seat.sectionName}, Row ${seat.rowNumber}, Seat ${seat.seatNumber}</span>
        </div>`).join('');

  // Generate seat list for plain text
  const seatsListText = seats.map((seat, index) => 
    `  ${index + 1}. ${seat.sectionName}, Row ${seat.rowNumber}, Seat ${seat.seatNumber}`
  ).join('\n');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reservation Confirmed</title>
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
    .confirmation-box {
      background-color: #f9f9f9;
      border-left: 4px solid #cc0000;
      padding: 20px;
      margin: 20px 0;
    }
    .confirmation-box h2 {
      margin-top: 0;
      color: #cc0000;
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
    .important-note {
      background-color: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 4px;
      padding: 15px;
      margin: 20px 0;
    }
    .important-note strong {
      color: #856404;
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
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏀 SBU Basketball</h1>
      <p style="margin: 10px 0 0 0; color: #666;">Seat Reservation Confirmed</p>
    </div>
    
    <div class="content">
      <p>Hi ${userName},</p>
      
      <p>Your seat reservation has been confirmed! We're excited to see you at the game.</p>
      
      <div class="confirmation-box">
        <h2>Your Reservation Details</h2>
        ${seatsListHtml}
        <div class="detail-row">
          <span class="detail-label">Total Seats:</span>
          <span class="detail-value">${totalSeats}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Reserved On:</span>
          <span class="detail-value">${reservationDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email:</span>
          <span class="detail-value">${userEmail}</span>
        </div>
      </div>

      <p>If you need to make any changes to your reservation, please contact us as soon as possible.</p>
      
      <p style="margin-top: 30px;">See you at the game!</p>
      <p style="margin: 5px 0;"><strong>SBU Basketball Team</strong></p>
    </div>
    
    <div class="footer">
      <p>This is an automated confirmation email.</p>
      <p>If you did not make this reservation, please contact us immediately.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
SBU Basketball - Seat Reservation Confirmed

Hi ${userName},

Your seat reservation has been confirmed!

RESERVATION DETAILS:
${seatsListText}

Total Seats: ${totalSeats}
Reserved On: ${reservationDate}
Email: ${userEmail}

See you at the game!

SBU Basketball Team

---
This is an automated confirmation email.
If you did not make this reservation, please contact us immediately.
  `.trim();

  return { subject, html, text };
}
