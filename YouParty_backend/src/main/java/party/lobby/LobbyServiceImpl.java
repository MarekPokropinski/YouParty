package party.lobby;

import java.util.List;
import java.util.stream.Collectors;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import party.video.Video;
import party.video.VideoService;
import party.youtube.YoutubeVideo;

@Service
public class LobbyServiceImpl implements LobbyService {
	private LobbyRepository lobbyRepository;
	private VideoService videoService;

	private static final Logger LOG = Logger.getLogger(LobbyService.class);

	@Autowired
	public LobbyServiceImpl(LobbyRepository lobbyRepository, VideoService videoService) {
		this.lobbyRepository = lobbyRepository;
		this.videoService = videoService;
	}

	@Override
	public void addVideoToQueue(Lobby lobby, YoutubeVideo youtubeVideo) {
		Video video = videoService.createVideo(youtubeVideo);
		lobby.getVideoQueue().add(video);
		lobbyRepository.save(lobby);
	}

	@Override
	public List<YoutubeVideo> getQueue(Lobby lobby) {
		return lobby.getVideoQueue().stream().map(video -> video.getVideo()).collect(Collectors.toList());
	}

	@Override
	public List<YoutubeVideo> getQueue(long lobbyId) throws LobbyNotFoundException {
		return getQueue(lobbyRepository.findById(lobbyId).orElseThrow(LobbyNotFoundException::new));
	}

	@Override
	public void addVideoToQueue(long lobbyId, YoutubeVideo video) throws LobbyNotFoundException {
		addVideoToQueue(lobbyRepository.findById(lobbyId).orElseThrow(LobbyNotFoundException::new), video);
	}

	@Override
	public long createLobby() {
		Lobby lobby = new Lobby();
		return lobbyRepository.saveAndFlush(lobby).getId();
	}

	@Override
	public void popFromQueue(long lobbyId) throws LobbyNotFoundException {
		try {
			Lobby lobby = lobbyRepository.findById(lobbyId).orElseThrow(LobbyNotFoundException::new);
			List<Video> videoQueue = lobby.getVideoQueue();
			Video videoToRemove = videoQueue.get(0);
			videoQueue.remove(0);
			lobbyRepository.save(lobby);
			videoService.removeVideo(videoToRemove);
		} catch (IndexOutOfBoundsException e) {
			LOG.warn("tried to remove top element from empty queue");
		}
	}
}
