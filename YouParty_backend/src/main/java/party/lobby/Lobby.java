package party.lobby;

import java.util.ArrayDeque;
import java.util.Queue;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

import party.basemodel.Basemodel;
import party.video.Video;

@Entity
public class Lobby extends Basemodel {
	@OneToMany
	private Queue<Video> videoQueue;

	public Lobby() {
		super();
		videoQueue = new ArrayDeque<Video>();
	}

	public Queue<Video> getVideoQueue() {
		return videoQueue;
	}

	public void setVideoQueue(Queue<Video> videoQueue) {
		this.videoQueue = videoQueue;
	}
}
