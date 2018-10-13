package org.oleggalimov.findtrueimage.rest

import org.json.JSONObject
import org.springframework.web.bind.annotation.*
import java.io.File
import java.nio.file.Files
import java.util.*
import javax.servlet.http.HttpServletResponse


@CrossOrigin(origins = ["*"])
@RestController
class imagefileslist {

    private val imagesDirPath = "images"
    @RequestMapping(value = ["/imagefileslist"], method = arrayOf(RequestMethod.GET))

    fun getimage() :String {
        val imageslist=ArrayList<String>()
        val dictDir = File(imagesDirPath)
        dictDir.listFiles().forEach {
            val name = it.name.dropLast(4)
            imageslist.add(name)
        }
        return imageslist.joinToString(";")
    }
}
