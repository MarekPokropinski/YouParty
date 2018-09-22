package party.youtube;

import java.util.List;

public interface YoutubeService {
	List<YoutubeVideo> findVideo(String title) throws YoutubeException;
}
