package party.qr;

import java.io.IOException;

import com.google.zxing.WriterException;

public interface QRCodeService {
	byte[] createPartyQRCode(long partyId) throws WriterException, IOException;
}
