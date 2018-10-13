package org.oleggalimov.findtrueimage.rest;

import org.json.JSONObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.File

@CrossOrigin(origins = ["*"])
@RestController
public class updatedictionary
@Autowired constructor(@Qualifier("dictionaries") val dictionaries: HashMap<String, JSONObject>) {
    val UPLOADFILE_SIZE=1*1024*1024
    @RequestMapping(value = ["/updatedictionary"], method = arrayOf(RequestMethod.POST))
    fun addWord (
            @RequestBody req:String
    ): String {
        try {
            val request=JSONObject(req)
            val id = request.getString("id")
            if (!id.isEmpty()) {
                val resp=JSONObject()
                val words = request.getJSONArray("words")
                words.forEach{
                    it->resp.put(it.toString(),0)
                }
                dictionaries[id]=resp
                return "success"
            } else {
                throw Exception("request to update dict with empty id: $id")
            }

        } catch (ex:Exception) {
            ex.printStackTrace()
            return "fail"
        }


    }
}
