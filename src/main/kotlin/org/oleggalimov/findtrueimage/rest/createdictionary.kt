package org.oleggalimov.findtrueimage.rest

import org.json.JSONObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.io.File

@CrossOrigin(origins = ["*"])
@RestController

class createdictionary
@Autowired constructor(@Qualifier("dictionaries") val dictionaries: HashMap<String, JSONObject>) {
    @RequestMapping(value = ["/createdictionary"])
    fun getwordfromdict(
            @RequestParam(name = "id", required = true) id: String
    ): String {
        if (id.isNotEmpty()&&id.isNotBlank()&& id != "") {
            return try {
                dictionaries[id] = JSONObject()
                println("added dictionary, current size is: ${dictionaries.size}")
                "success"
            } catch (ex: Exception) {
                "error"
            }
        } else {
                return "fail"
            }
        }

    }