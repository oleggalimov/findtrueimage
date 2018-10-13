package org.oleggalimov.findtrueimage.rest


import org.springframework.web.bind.annotation.*
import java.io.File
import java.net.URLEncoder
import java.nio.file.Files
import javax.servlet.http.HttpServletResponse

@CrossOrigin(origins = ["*"])
@RestController
class audio {
    private val audioDirPath = javaClass.classLoader.getResource("audio").path
    @RequestMapping (value = ["/audio"], method = [RequestMethod.GET])
    fun getAudio (
            @RequestParam (value = "word", required = true) word : String,
            res: HttpServletResponse
    ) {
        var audio = File("${audioDirPath}/$word.mp3")
        val response = if (!audio.exists()) {
            val audioBytes = khttp.get("https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${URLEncoder.encode(word, "UTF-8")}&tl=en&client=tw-ob").content
            audio.writeBytes(audioBytes)
            audioBytes
        } else {
            val audioBytes= Files.readAllBytes(audio.toPath())
            audioBytes
        }
        res.contentType="audio/mpeg"
        res.outputStream.write(response)
        res.outputStream.flush()
    }

}