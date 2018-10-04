package party.staticResources;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class StaticResourcesController {
	@RequestMapping(value = "/a/**", method = RequestMethod.GET)
	public String Pages() {
		return "index";
	}
}
