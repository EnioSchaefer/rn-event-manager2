export type UserEvent = {
  userId: number;
  eventId: number;
  qrCode: Buffer;
  used: boolean;
}

export type QrCodeData = {
  userId: number,
  eventId: number,
  email?: string,
}