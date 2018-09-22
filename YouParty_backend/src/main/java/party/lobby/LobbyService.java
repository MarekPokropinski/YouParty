package party.lobby;

import java.util.List;

import party.youtube.YoutubeVideo;

public interface LobbyService {
	void addVideoToQueue(Lobby lobby, YoutubeVideo video);

	void addVideoToQueue(long lobbyId, YoutubeVideo video) throws LobbyNotFoundException;

	List<YoutubeVideo> getQueue(Lobby lobby);

	List<YoutubeVideo> getQueue(long lobbyId) throws LobbyNotFoundException;

	long createLobby();
}
