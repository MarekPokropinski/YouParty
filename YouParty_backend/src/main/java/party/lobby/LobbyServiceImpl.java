package party.lobby;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import party.youtube.YoutubeVideo;

@Service
public class LobbyServiceImpl implements LobbyService {

	private VideoRepository videoRepository;

	@Autowired
	public LobbyServiceImpl(VideoRepository videoRepository) {
		this.videoRepository = videoRepository;
	}

	@Override
	public void addVideoToQueue(YoutubeVideo video) {
		VideoEntity entity = createVideoEntity(video);
		videoRepository.saveAndFlush(entity);
	}

	@Override
	public List<YoutubeVideo> getQueue() {
		return videoRepository.findAllByOrderByIdAsc().stream().map(videoEntity -> createYoutubeVideo(videoEntity))
				.collect(Collectors.toList());
	}

	private VideoEntity createVideoEntity(YoutubeVideo video) {
		return new VideoEntity(video);
	}

	private YoutubeVideo createYoutubeVideo(VideoEntity videoEntity) {
		return videoEntity.getVideo();
	}

}
