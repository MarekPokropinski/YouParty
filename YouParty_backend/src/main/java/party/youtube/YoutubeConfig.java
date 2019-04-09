package party.youtube;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.security.GeneralSecurityException;

import org.jboss.logging.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;

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

	public static String apiKey() {
		String line = null;
		try {
			InputStream is = new ClassPathResource("apiKey.key").getInputStream();
			try (BufferedReader bufferedReader = new BufferedReader(
					new InputStreamReader(is, Charset.defaultCharset()))) {
				line = bufferedReader.readLine();
			}
		} catch (IOException e) {
			LOG.error("Api key file does not exist. Locate key in apikey.key file");
			System.exit(-1);
		}

		if (line == null) {
			LOG.error("Api key not provided");
			System.exit(-1);
		} else {
			LOG.info(String.format("useing api key: %s", line));
		}
		return line;
	}
}
