package party.lobby;

import java.util.List;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import party.youtube.YoutubeVideo;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping(path = "/lobby")
public class LobbyController {

	private static final Logger LOG = Logger.getLogger(LobbyController.class);

	private LobbyService lobbyService;

	@Autowired
	public LobbyController(LobbyService lobbyService) {
		this.lobbyService = lobbyService;
	}

	@GetMapping("/queue")
	@ResponseBody
	List<YoutubeVideo> getQueue(@RequestParam long lobbyId) throws LobbyNotFoundException {
		return lobbyService.getQueue(lobbyId);
	}

	@MessageMapping("/add/{lobbyId}")
	@SendTo("/queue/{lobbyId}")
	public List<YoutubeVideo> addVideoToQueue(YoutubeVideo youtubeVideo, @DestinationVariable long lobbyId) {
		try {
			lobbyService.addVideoToQueue(lobbyId, youtubeVideo);
			return lobbyService.getQueue(lobbyId);
		} catch (LobbyNotFoundException e) {
			LOG.error(String.format("failed to add video to queue with id: %s, reason: lobby not found", lobbyId));
		}
		return List.of();
	}
}
