import QRCode from 'qrcode';
import { QrCodeData } from '../database/types/UserEvent';

async function createQRCode(qrCodeData: QrCodeData) {
    const {eventId, email, userId} = qrCodeData;
    const qrCodeString = `${eventId}_${email}_${userId}`;

    try {
        const qrCode = await QRCode.toBuffer(qrCodeString);

        return qrCode;
    } catch (error) {
        throw new Error('There was an issue with the creation of the QR code, please try again');
    }
}

export default createQRCode;