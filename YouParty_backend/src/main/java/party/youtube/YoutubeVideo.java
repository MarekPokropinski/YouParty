package party.youtube;

import javax.persistence.Embeddable;

@Embeddable
public class YoutubeVideo {
	private String title;
	private String videoId;
	private String imageUrl;

	public YoutubeVideo() {

	}

	public YoutubeVideo(String title, String id, String imageUrl) {
		this.title = title;
		this.videoId = id;
		this.imageUrl = imageUrl;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getId() {
		return videoId;
	}

	public void setId(String id) {
		this.videoId = id;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	@Override
	public String toString() {
		return String.format("{\n\ttitle: %s\n\tid: %s\n\turl: %s\n}\n", title, videoId, imageUrl);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj.getClass() == this.getClass()) {
			YoutubeVideo second = (YoutubeVideo) obj;
			return title.equals(second.getTitle()) && videoId.equals(second.getId())
					&& imageUrl.equals(second.getImageUrl());
		}
		return false;
	}

}
