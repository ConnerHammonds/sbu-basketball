/**
 * Example usage of the new Customer and Reservation models
 * 
 * ARCHITECTURE:
 * - Admin credentials: Stored ONLY in Account table (with Better Auth)
 * - Customer data: Stored in separate Customers table (no User/Account needed)
 * 
 * Benefits:
 * - Clean separation of admin authentication vs customer data
 * - No password storage for customers
 * - Simpler customer management
 */

// Example: Create a customer and reservation
async function createCustomerReservation(email: string, name: string, phone: string, seatId: number) {
  // 1. Create or get customer
  const customer = await prisma.customer.upsert({
    where: { email },
    create: {
      email,
      name,
      phone,
    },
    update: {
      name,
      phone,
    },
  });

  // 2. Create reservation
  const reservation = await prisma.reservation.create({
    data: {
      customerId: customer.id,
      seatId,
      status: 'reserved',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    },
  });

  return { customer, reservation };
}

// Example: Get all reservations for a customer
async function getCustomerReservations(email: string) {
  const customer = await prisma.customer.findUnique({
    where: { email },
    include: {
      reservations: {
        include: {
          seat: {
            include: {
              section: true,
            },
          },
        },
      },
    },
  });

  return customer;
}

// Example: Cancel a reservation
async function cancelReservation(reservationId: string) {
  const reservation = await prisma.reservation.update({
    where: { id: reservationId },
    data: {
      status: 'cancelled',
      cancelledAt: new Date(),
    },
  });

  return reservation;
}
