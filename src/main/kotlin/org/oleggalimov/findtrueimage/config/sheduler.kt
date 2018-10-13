package org.oleggalimov.findtrueimage.config

import org.json.JSONObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled
import java.io.File
import java.io.ObjectOutputStream

@EnableScheduling
@Configuration
class sheduler
@Autowired constructor(@Qualifier("dictionaries") val dictionaries: HashMap<String, JSONObject>) {
    @Scheduled(fixedDelay = 1000*30*60)
    fun saveDict() {
        println("Saving dictionaries: ${dictionaries.size}")
        dictionaries.forEach {
            (key, value) -> File("dictionaries/$key.json").writeText(value.toString())
        }

    }
}