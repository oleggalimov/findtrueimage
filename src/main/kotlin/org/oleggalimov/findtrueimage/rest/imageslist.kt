package org.oleggalimov.findtrueimage.rest

import org.springframework.web.bind.annotation.*
import java.io.File
import java.util.*
import javax.servlet.http.HttpServletResponse


@CrossOrigin(origins = ["*"])
@RestController
class imageslist {
    private val random = Random()
//    private val imagesDirPath = javaClass.classLoader.getResource("images").path
    private val imagesDirPath = "images"
    @RequestMapping(value = ["/imageslist"], method = arrayOf(RequestMethod.GET))

    fun getimage(
            @RequestParam(name = "word", required = true) word: String,
            @RequestParam(name = "counter", required = true) count_mock_words: Int,
            response: HttpServletResponse
    ) {
        if (word.isNotEmpty()) {
            val image = File("${imagesDirPath}/$word.jpg")
            if (image.exists()) {
                val images=HashSet<String>()
                images.add(word)
                val avalible_images = File(imagesDirPath).list().toMutableList() //конвертируем просто Array в изменяемый список чтобы можно было извлекать элементы
                //добираем еще изображения
                val tempCopyOfAvailableImages = avalible_images.toMutableList()
                while (images.size<(count_mock_words) && tempCopyOfAvailableImages.size>0 ) {
                    images.add(tempCopyOfAvailableImages.removeAt(random.nextInt(tempCopyOfAvailableImages.size)).dropLast(4))
                }
                //если не добрали - берем просто любые
                while (images.size<(count_mock_words)) {
                    val tempImage = avalible_images[random.nextInt(avalible_images.size)]
                    println(tempImage)
                    //проверяем что это не исходное слово с расширением
                    if (!tempImage.dropLast(4).equals(word)) {
                        images.add(tempImage)
                    }

                }
                response.status = 200
                response.contentType = "text/plain; charset=utf-8"
                val res:String = images.joinToString(";")
                response.outputStream.write(res.toByteArray())
            } else {
                response.status = 404
                response.contentType = "text/html; charset=utf-8"
                response.outputStream.write("Image not found".toByteArray())
            }
        } else {

            response.status = 400
            response.contentType = "text/html; charset=utf-8"
            response.outputStream.write("Parameter \"word\" or \"mock_words\" is empty".toByteArray())
        }
    }
}
