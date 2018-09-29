package party.qr;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.zxing.WriterException;

@RestController
public class QRCodeController {

	private static final Logger LOG = Logger.getLogger(QRCodeController.class);

	private QRCodeService qrCodeService;

	@Autowired
	public QRCodeController(QRCodeService qrCodeService) {
		this.qrCodeService = qrCodeService;
	}

	@RequestMapping(value = "/qrcode", method = RequestMethod.GET, produces = "image/png")
	void generateQRCode(@RequestParam long partyId, HttpServletResponse response) {
		try {
			StreamUtils.copy(qrCodeService.createPartyQRCode(partyId), response.getOutputStream());
		} catch (IOException | WriterException e) {
			String errorMessage = String.format("Failed to create QR code. Reason: %s", e.getMessage());
			LOG.error(errorMessage);
			try {
				response.sendError(400, errorMessage);
			} catch (IOException | IllegalStateException e1) {
				LOG.error(String.format("Failed to set response code. Reason: %s", e1.getMessage()));
			}
		}
	}

}
