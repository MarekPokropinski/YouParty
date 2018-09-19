package party.lobby;

import java.util.List;

import party.youtube.YoutubeVideo;

public interface LobbyService {
	void addVideoToQueue(YoutubeVideo video);

	List<YoutubeVideo> getQueue();
}
