package party.youtube;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/you")
@Profile(value = { "dev", "prod" })
public class YoutubeController {

	private YoutubeService youtubeService;

	@Autowired
	public YoutubeController(YoutubeService youtubeService) {
		this.youtubeService = youtubeService;
	}

	@GetMapping("/find")
	List<YoutubeVideo> findVideo(@RequestParam String title) throws YoutubeException {
		return youtubeService.findVideo(title);
	}
}
