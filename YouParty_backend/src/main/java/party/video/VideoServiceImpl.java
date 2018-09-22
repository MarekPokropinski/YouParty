package party.video;

import org.springframework.stereotype.Service;

import party.youtube.YoutubeVideo;

@Service
public class VideoServiceImpl implements VideoService {
	private VideoRepository videoRepository;

	public VideoServiceImpl(VideoRepository videoRepository) {
		this.videoRepository = videoRepository;
	}

	@Override
	public Video createVideo(YoutubeVideo youtubeVideo) {
		return videoRepository.save(new Video(youtubeVideo));
	}

	@Override
	public void removeVideo(Video video) {
		videoRepository.delete(video);
	}
}
