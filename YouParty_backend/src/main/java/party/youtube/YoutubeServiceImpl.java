package party.youtube;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;

@Service
@Profile(value = { "dev", "prod" })
public class YoutubeServiceImpl implements YoutubeService {
	private static final long MAX_RESULTS = 5;
	private String apiKey = YoutubeConfig.apiKey();

	@Autowired
	private YouTube youtube;

	private YoutubeVideo getVideoFromSearchResult(SearchResult result) {
		String title = result.getSnippet().getTitle();
		String videoId = result.getId().getVideoId();
		String thumbnailUrl = result.getSnippet().getThumbnails().getHigh().getUrl();
		return new YoutubeVideo(title, videoId, thumbnailUrl);
	}

	@Override
	public List<YoutubeVideo> findVideo(String title) throws YoutubeException {
		try {
			SearchListResponse response = youtube.search().list("snippet").setMaxResults(MAX_RESULTS).setQ(title)
					.setType("video").setKey(apiKey).execute();
			return response.getItems().stream().map(result -> getVideoFromSearchResult(result))
					.collect(Collectors.toList());
		} catch (IOException e) {
			throw new YoutubeException();
		}
	}
}
