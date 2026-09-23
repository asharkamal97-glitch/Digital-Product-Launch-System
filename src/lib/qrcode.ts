import QRCode from 'qrcode';

export async function generateQRCodeDataURL(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 200,
      color: {
        dark: '#0F2851', // Brand Navy
        light: '#FFFFFF',
      },
    });
  } catch (err) {
    console.error('QR Code generation failed:', err);
    return '';
  }
}
