package org.oleggalimov.findtrueimage.rest

import org.springframework.web.bind.annotation.*
import java.io.File
import java.io.FilenameFilter
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*
import javax.servlet.http.HttpServletResponse
import kotlin.collections.ArrayList

@CrossOrigin(origins = ["*"])
@RestController
class image {

    private val random = Random()
//    private val imagesDirPath = javaClass.classLoader.getResource("images").path
    private val imagesDirPath = "images"
    @RequestMapping(value = ["/image"], method = arrayOf(RequestMethod.GET))
    fun getimage(
            @RequestParam(name = "word", required = true) word: String,
            response: HttpServletResponse
    ) {
        if (word.isNotEmpty()) {
            val image = File("${imagesDirPath}/$word.jpg")
            if (image.exists()) {
                response.status = 200
                response.setHeader("word", word)
                response.contentType = "text/plain"
                response.outputStream.write(Base64.getEncoder().encode(Files.readAllBytes(image.toPath())))
            } else {
                response.status = 404
                response.contentType = "text/html; charset=utf-8"
                response.outputStream.write("Image not found".toByteArray())
            }
        } else {
            response.status = 404
            response.contentType = "text/html; charset=utf-8"
            response.outputStream.write("Parameter \"word\" or \"mock_words\" is empty".toByteArray())
        }
    }
}
