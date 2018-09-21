package party.video;

import javax.persistence.Embedded;
import javax.persistence.Entity;

import party.basemodel.Basemodel;
import party.youtube.YoutubeVideo;

@Entity
public class Video extends Basemodel {

	@Embedded
	private YoutubeVideo video;

	public Video() {
		super();
	}

	public Video(YoutubeVideo video) {
		this.video = video;
	}

	public YoutubeVideo getVideo() {
		return video;
	}

	public void setVideo(YoutubeVideo video) {
		this.video = video;
	}

	@Override
	public String toString() {
		return String.format("id: %s\n%s", getId(), video.toString());
	}
}
