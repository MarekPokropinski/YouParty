package party.video;

import party.youtube.YoutubeVideo;

public interface VideoService {
	Video createVideo(YoutubeVideo youtubeVideo);

	void removeVideo(Video video);
}
