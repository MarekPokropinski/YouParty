package party.lobby;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import party.youtube.YoutubeVideo;

@Entity
public class VideoEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Embedded
	private YoutubeVideo video;

	public VideoEntity() {
		super();
	}

	public VideoEntity(YoutubeVideo video) {
		this.video = video;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public YoutubeVideo getVideo() {
		return video;
	}

	public void setVideo(YoutubeVideo video) {
		this.video = video;
	}

	@Override
	public String toString() {
		return String.format("id: %s\n%s", id, video.toString());
	}
}
