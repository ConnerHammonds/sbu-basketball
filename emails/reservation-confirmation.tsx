import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface ReservationConfirmationEmailProps {
  userName: string;
  userEmail: string;
  seats: Array<{
    sectionName: string;
    seatNumber: number;
    rowNumber: number;
  }>;
  reservationDate: string;
}

export default function ReservationConfirmationEmail({
  userName = 'John Doe',
  userEmail = 'john@example.com',
  seats = [
    { sectionName: 'Section A1', seatNumber: 5, rowNumber: 3 },
  ],
  reservationDate = 'January 5, 2026 at 02:30 PM',
}: ReservationConfirmationEmailProps) {
  const totalSeats = seats.length;
  const previewText = totalSeats === 1 
    ? `Your seat in ${seats[0].sectionName} has been reserved`
    : `Your ${totalSeats} seats have been reserved`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>🏀 SBU Basketball</Heading>
            <Text style={headerSubtitle}>Seat Reservation Confirmed</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={paragraph}>Hi {userName},</Text>
            
            <Text style={paragraph}>
              Your seat reservation has been confirmed! We're excited to see you at the game.
            </Text>

            {/* Confirmation Box */}
            <Section style={confirmationBox}>
              <Heading as="h2" style={confirmationTitle}>
                Your Reservation Details
              </Heading>
              
              {seats.map((seat, index) => (
                <Row key={index} style={detailRow}>
                  <Column style={detailLabel}>Seat {index + 1}:</Column>
                  <Column style={detailValue}>
                    {seat.sectionName}, Row {seat.rowNumber}, Seat {seat.seatNumber}
                  </Column>
                </Row>
              ))}

              <Row style={detailRow}>
                <Column style={detailLabel}>Total Seats:</Column>
                <Column style={detailValue}>{totalSeats}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Reserved On:</Column>
                <Column style={detailValue}>{reservationDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Email:</Column>
                <Column style={detailValue}>{userEmail}</Column>
              </Row>
            </Section>

            <Text style={paragraph}>
              If you need to make any changes to your reservation, please contact us as soon as possible.
            </Text>

            <Text style={{ ...paragraph, marginTop: '30px' }}>
              See you at the game!
            </Text>
            <Text style={{ ...paragraph, margin: '5px 0' }}>
              <strong>SBU Basketball Team</strong>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>This is an automated confirmation email.</Text>
            <Text style={footerText}>
              If you did not make this reservation, please contact us immediately.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f4f4f4',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  padding: '40px',
};

const header = {
  textAlign: 'center' as const,
  paddingBottom: '30px',
  borderBottom: '3px solid #cc0000',
};

const headerTitle = {
  color: '#cc0000',
  margin: '0',
  fontSize: '28px',
};

const headerSubtitle = {
  margin: '10px 0 0 0',
  color: '#666',
};

const content = {
  padding: '30px 0',
};

const paragraph = {
  lineHeight: '1.6',
  color: '#333',
};

const confirmationBox = {
  backgroundColor: '#f9f9f9',
  borderLeft: '4px solid #cc0000',
  padding: '20px',
  margin: '20px 0',
};

const confirmationTitle = {
  marginTop: '0',
  color: '#cc0000',
  fontSize: '20px',
};

const detailRow = {
  padding: '10px 0',
  borderBottom: '1px solid #eee',
};

const detailLabel = {
  fontWeight: 'bold',
  color: '#666',
  width: '140px',
};

const detailValue = {
  color: '#333',
};

const footer = {
  textAlign: 'center' as const,
  paddingTop: '30px',
  borderTop: '1px solid #eee',
};

const footerText = {
  color: '#999',
  fontSize: '14px',
};
