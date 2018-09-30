package party.qr;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

@Service
public class QRCodeServiceImpl implements QRCodeService {

	private static final String imageFormat = "PNG";

	private static final int qrCodeSize = 200;

	@Value("${party.remote.url}")
	private String remoteControllerUrl;

	private byte[] getQRCodeImage(String text, int width, int height) throws WriterException, IOException {
		QRCodeWriter qrCodeWriter = new QRCodeWriter();

		BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

		ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
		MatrixToImageWriter.writeToStream(bitMatrix, imageFormat, pngOutputStream);
		byte[] pngData = pngOutputStream.toByteArray();
		return pngData;
	}

	@Override
	public byte[] createPartyQRCode(long partyId) throws WriterException, IOException {
		return getQRCodeImage(String.format("%s/%d", remoteControllerUrl, partyId), qrCodeSize, qrCodeSize);
	}

}
