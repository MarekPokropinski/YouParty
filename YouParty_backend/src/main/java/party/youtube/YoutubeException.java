package party.youtube;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Youtube not availible")
public class YoutubeException extends Exception {
	private static final long serialVersionUID = 2859971870282684352L;
}
