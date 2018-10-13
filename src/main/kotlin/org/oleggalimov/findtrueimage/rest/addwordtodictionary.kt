package org.oleggalimov.findtrueimage.rest;

import org.json.JSONObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.http.HttpRequest
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.File

@CrossOrigin(origins = ["*"])
@RestController
public class addwordtodictionary
@Autowired constructor(@Qualifier("dictionaries") val dictionaries: HashMap<String, JSONObject>) {
    val UPLOADFILE_SIZE=1*1024*1024
    @RequestMapping (value = ["/addwordtodictionary"], method = arrayOf(RequestMethod.POST))
    fun addWord (
            @RequestParam (name="dictid", required = false) dictid:String,
            @RequestParam (name="word", required = false) word:String,
            @RequestParam("file",required = false) file : MultipartFile?
            ): String {

        if ((file!=null)&&(word.isNotBlank())&&(dictid.isNotBlank())) {
            return try {
                val dictJson = dictionaries[dictid]!!
                dictJson.put(word,0)
                File("images/$word.jpg").writeBytes(file.bytes)
                "success"
            } catch (ex: Exception) {
                ex.printStackTrace()
                "error"
            }
        } else if ((file==null)&&(word.isNotBlank())&&(dictid.isNotBlank())) {
            return try {
                val dictJson = dictionaries[dictid]!!
                dictJson.put(word,0)
                "success"
            } catch (ex: Exception) {
                ex.printStackTrace()
                "error"
            }
        }else {
            return "fail"
        }

    }
}
