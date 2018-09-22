package party.lobby;

import java.util.ArrayDeque;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

import party.basemodel.Basemodel;
import party.video.Video;

@Entity
public class Lobby extends Basemodel {
	@OneToMany
	private Collection<Video> videoQueue;

	public Lobby() {
		super();
		videoQueue = new ArrayDeque<Video>();
	}

	public Collection<Video> getVideoQueue() {
		return videoQueue;
	}

	public void setVideoQueue(Collection<Video> videoQueue) {
		this.videoQueue = videoQueue;
	}
}
