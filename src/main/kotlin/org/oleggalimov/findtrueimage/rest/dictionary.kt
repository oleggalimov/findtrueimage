package org.oleggalimov.findtrueimage.rest

import com.sun.org.apache.xpath.internal.operations.Bool
import org.json.JSONObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@CrossOrigin(origins = ["*"])
@RestController
class dictionary
@Autowired constructor(@Qualifier("dictionaries") val dictionaries: HashMap<String, JSONObject>) {
    @RequestMapping(value = ["/dictionary"])
    fun getwordfromdict(
            @RequestParam(name = "id", required = true) id: String,
            @RequestParam(name = "get", required = true) get: Boolean
    ): String {
        if (!get) {
            return try {
                val dict = dictionaries[id]!!
                var response = findWord(dict)
                if (response == "") {
                    resetDict(dict)
                    response = findWord(dict)
                }
                response
            } catch (ex: Exception) {
                "error"
            }
        } else {
            return try {
                dictionaries[id]!!.toString()
            } catch (ex: Exception) {
                "fail"
            }
        }

    }

    fun findWord(dict: JSONObject): String {
        var word = ""
        for (key in dict.keySet()) {
            if (dict[key] == 0) {
                word = key
                dict.put(key, 1)
                break
            }
        }
        return word
    }

    fun resetDict(dict: JSONObject) {
        for (key in dict.keySet()) {
            dict.put(key, 0)
        }
    }
}