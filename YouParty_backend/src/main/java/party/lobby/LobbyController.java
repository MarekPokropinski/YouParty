package party.lobby;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import party.youtube.YoutubeVideo;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/lobby")
public class LobbyController {

	private LobbyService lobbyService;

	@Autowired
	public LobbyController(LobbyService lobbyService) {
		this.lobbyService = lobbyService;
	}

	@GetMapping("/queue")
	List<YoutubeVideo> getQueue() {
		return lobbyService.getQueue();
	}

	@PostMapping("/add")
	void addVideoToQueue(@RequestBody YoutubeVideo video) {
		lobbyService.addVideoToQueue(video);
	}
}
