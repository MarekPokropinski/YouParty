package party.youtube;

import java.io.IOException;
import java.security.GeneralSecurityException;

import org.jboss.logging.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;

@Configuration
@Profile(value = { "dev", "prod" })
public class YoutubeConfig {
	/** Application name. */
	private static final String APPLICATION_NAME = "YouParty";

	private static final Logger LOG = Logger.getLogger(YoutubeConfig.class);

	@Bean
	public static YouTube getYouTubeService() throws IOException {
		LOG.info("Connecting with YouTube API serivce");

		HttpTransport HTTP_TRANSPORT;
		try {
			HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
			JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
			return new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, (HttpRequest request) ->
				{
				}).setApplicationName(APPLICATION_NAME).build();
		} catch (GeneralSecurityException e) {
			LOG.error("failed to initialize google http transport");
			System.exit(1);
			return null;
		}
	}
}
