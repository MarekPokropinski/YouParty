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

	private static final YoutubeVideo[] videoMocks = new YoutubeVideo[] {
			new YoutubeVideo("abc", "cde", "http://aaa.bb/ccc"), new YoutubeVideo("123", "234", "http://123.11/22"),
			new YoutubeVideo("zxc", "cxz", "http://zzz.xx/ccc"), new YoutubeVideo("qwe", "sdq", "http://qwe.xx/ccc"),
			new YoutubeVideo("zza", "mmm", "http://hhh.xx/ccc"),
			new YoutubeVideo("HUNTER - NieWolnOść", "jIB6E1gSoMM", "https://i.ytimg.com/vi/jIB6E1gSoMM/hqdefault.jpg"),
			new YoutubeVideo("HUNTER - Imperium UBOJU (Official Video) [HD]", "Mzr_4H68FsY",
					"https://i.ytimg.com/vi/Mzr_4H68FsY/hqdefault.jpg"),
			new YoutubeVideo("OMFG - Hello", "ih2xubMaZWI", "https://i.ytimg.com/vi/ih2xubMaZWI/hqdefault.jpg"),
			new YoutubeVideo("OMFG - Meant for You", "4UfEnhnHGhI", "https://i.ytimg.com/vi/4UfEnhnHGhI/hqdefault.jpg"),
			new YoutubeVideo("OMFG - I Love You", "qn-X5A0gbMA", "https://i.ytimg.com/vi/qn-X5A0gbMA/hqdefault.jpg"),
			new YoutubeVideo("OMFG - Peanut Butter", "Wb2KXavkE9I",
					"https://i.ytimg.com/vi/Wb2KXavkE9I/hqdefault.jpg") };

	private static final int REPEAT_TEST = 10;

	private Lobby getLobby(long lobbyId) throws LobbyNotFoundException {
		return lobbyRepository.findById(lobbyId).orElseThrow(LobbyNotFoundException::new);
	}

	@Test
	public void testCreateLobby() {
		for (int testNr = 0; testNr < REPEAT_TEST; testNr++) {
			long lobbyId = lobbyService.createLobby();
			assertTrue(lobbyRepository.existsById(lobbyId));
		}
	}

	@Test
	public void testAddToQueue() {
		for (int testNr = 0; testNr < REPEAT_TEST; testNr++) {
			long lobbyId = lobbyService.createLobby();
			try {
				for (var video : videoMocks) {
					lobbyService.addVideoToQueue(lobbyId, video);
					Lobby lobby = getLobby(lobbyId);
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

	@Test
	public void testGetQueue() {
		for (int testNr = 0; testNr < REPEAT_TEST; testNr++) {
			long lobbyId = lobbyService.createLobby();
			try {
				for (var video : videoMocks) {
					lobbyService.addVideoToQueue(lobbyId, video);
					List<YoutubeVideo> queue = lobbyService.getQueue(lobbyId);
					for (int i = 0; i < queue.size(); i++) {
						assertTrue("Queue is not correct", queue.get(i).equals(videoMocks[i]));
					}
				}
			} catch (LobbyNotFoundException e) {
				fail("Failed adding to queue: lobby not found");
			}
		}
	}

	@Test
	public void testPopFromQueue() {
		for (int testNr = 0; testNr < REPEAT_TEST; testNr++) {
			long lobbyId = lobbyService.createLobby();
			try {
				for (var video : videoMocks) {
					lobbyService.addVideoToQueue(lobbyId, video);
				}
				for (int i = 0; i < videoMocks.length; i++) {
					assertTrue(String.format("First video in queue is not right. Video number: %d", i),
							getLobby(lobbyId).getVideoQueue().get(0).getVideo().equals(videoMocks[i]));
					lobbyService.popFromQueue(lobbyId);
				}
				assertTrue("queue should be empty", getLobby(lobbyId).getVideoQueue().isEmpty());
				lobbyService.popFromQueue(lobbyId);
				assertTrue("queue should be empty", getLobby(lobbyId).getVideoQueue().isEmpty());
			} catch (LobbyNotFoundException e) {
				fail("Failed adding to queue: lobby not found");
			}
		}
	}
}
