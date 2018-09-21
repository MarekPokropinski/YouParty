package party.lobby;

import party.youtube.YoutubeVideo;

public class VideoInLobby {
	private long lobbyId;
	private YoutubeVideo youtubeVideo;

	public VideoInLobby() {

	}

	public long getLobbyId() {
		return lobbyId;
	}

	public void setLobbyId(long lobbyId) {
		this.lobbyId = lobbyId;
	}

	public YoutubeVideo getYoutubeVideo() {
		return youtubeVideo;
	}

	public void setYoutubeVideo(YoutubeVideo youtubeVideo) {
		this.youtubeVideo = youtubeVideo;
	}
}
