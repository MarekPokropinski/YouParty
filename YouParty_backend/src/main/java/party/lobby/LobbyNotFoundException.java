package party.lobby;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Lobby not found")
public class LobbyNotFoundException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8259695210908428180L;

}
