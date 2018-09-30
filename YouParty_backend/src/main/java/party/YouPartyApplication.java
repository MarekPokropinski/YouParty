package party;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class YouPartyApplication extends SpringBootServletInitializer {
	public static void main(String[] args) {
		SpringApplication.run(YouPartyApplication.class, args);
	}
}
