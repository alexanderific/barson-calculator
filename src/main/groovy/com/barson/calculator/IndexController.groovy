package com.barson.calculator

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

/**
 * Default context root controller. <p>
 * Handles index page requests to start client application.
 * @author Alex barson
 */
@Controller
class IndexController {

    @RequestMapping("/")
    def index() {
        return "index.html"
    }

}
