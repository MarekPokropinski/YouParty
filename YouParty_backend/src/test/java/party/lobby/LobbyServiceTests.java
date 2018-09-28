package party.lobby;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.google.api.services.youtube.YouTube;

import party.video.Video;
import party.youtube.YoutubeVideo;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LobbyServiceTests {

//	@MockBean
//	private VideoService videoServiceMock;
//	@Autowired
//	private VideoService videoServiceMock;

//	@Autowired
//	private LobbyRepository lobbyRepository;
//
//	@Autowired
//	private TestEntityManager entityManager;

//	@Mock
//	private VideoService videoServiceMock;

	@MockBean
	private YouTube youtube;

	@Autowired
	private LobbyRepository lobbyRepository;

	@Autowired
	private LobbyServiceImpl lobbyService;

	@Test
	public void testCreateLobby() {
		for (int i = 0; i < 1000; i++) {
			long lobbyId = lobbyService.createLobby();
			assertTrue(lobbyRepository.existsById(lobbyId));
		}
	}

	@Test
	public void testAddToQueue() {
		YoutubeVideo[] videos = new YoutubeVideo[] { new YoutubeVideo("abc", "cde", "http://aaa.bb/ccc"),
				new YoutubeVideo("123", "234", "http://123.11/22"),
				new YoutubeVideo("zxc", "cxz", "http://zzz.xx/ccc") };

		for (int i = 0; i < 10; i++) {
			long lobbyId = lobbyService.createLobby();
			Lobby lobby = lobbyRepository.findById(lobbyId).get();
			try {
				for (var video : videos) {
					lobbyService.addVideoToQueue(lobbyId, video);
					lobby = lobbyRepository.findById(lobbyId).get();
					List<Video> videoQueue = lobby.getVideoQueue();
					assertFalse("video queue empty after adding video", videoQueue.isEmpty());
					Video lastInQueue = videoQueue.get(videoQueue.size() - 1);
					assertTrue(lastInQueue.getVideo().equals(video));
				}
			} catch (LobbyNotFoundException e) {
				fail("Failed adding to queue: lobby not found");
			}
		}
	}
}
