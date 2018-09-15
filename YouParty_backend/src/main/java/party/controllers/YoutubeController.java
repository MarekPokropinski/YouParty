package party.controllers;

import java.io.IOException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.YouTube.Search.List;
import com.google.api.services.youtube.model.SearchListResponse;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/you")
public class YoutubeController {
	private static final long MAX_RESULTS = 5;

	@Autowired
	private YouTube youtube;

	@GetMapping("/find")
	java.util.List<String> findMusic(@RequestParam String title) {
		System.out.println("looking for video");
		try {
			List foundVideos = youtube.search().list("snippet");
			foundVideos.setMaxResults(MAX_RESULTS);
			foundVideos.setQ(title);
			foundVideos.setType("video");
			SearchListResponse response = foundVideos.execute();
			return response.getItems().stream().map(result -> result.getSnippet().getTitle())
					.collect(Collectors.toList());

		} catch (IOException e) {
			e.printStackTrace();
		}
		return java.util.List.of();
	}
}
