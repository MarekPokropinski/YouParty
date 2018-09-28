package party.lobby;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import party.basemodel.Basemodel;
import party.video.Video;

@Entity
public class Lobby extends Basemodel {
	@OneToMany(fetch = FetchType.EAGER)
	private List<Video> videoQueue;

	public Lobby() {
		super();
		videoQueue = new LinkedList<Video>();
	}

	public List<Video> getVideoQueue() {
		return videoQueue;
	}

	public void setVideoQueue(List<Video> videoQueue) {
		this.videoQueue = videoQueue;
	}
}
