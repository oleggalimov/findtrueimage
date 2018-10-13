package org.oleggalimov.findtrueimage.config

import org.json.JSONObject

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Bean
import org.springframework.web.multipart.commons.CommonsMultipartResolver

import java.io.File

import java.nio.file.Files
import javax.annotation.PostConstruct


@Configuration
class configuration {
    @Bean("dictionaries")
    fun readDictionaries(): HashMap<String, JSONObject> {
        val dictionaries = HashMap<String, JSONObject>()
        val dictDir = File("dictionaries")
        if (dictDir.exists()) {
            dictDir.listFiles().forEach {
                val name = it.name.dropLast(5)
                val lines = String(Files.readAllBytes(it.toPath()))
                dictionaries[name] = JSONObject(lines)
            }
            println("Загружено: ${dictionaries.size} справочников")
        } else {
            println("Справочники не найдены")
        }

        return dictionaries
    }


    //добавляем резолвер для мультипарт запросов, в противном случае -Failed to parse multipart servlet request...No multipart config for servlet
    @Bean(name = arrayOf("multipartResolver"))
    fun multipartResolver(): CommonsMultipartResolver {
        val multipartResolver = CommonsMultipartResolver()
        multipartResolver.setMaxUploadSize(1 * 1024 * 1024)
        return multipartResolver
    }

    @PostConstruct
    fun createDirs() {
        arrayOf("dictionaries", "audio", "images").forEach { it ->
            (
                    if (!File(it).exists()) {
                        println("Создали директорию $it")
                        File(it).mkdir()
                    }
                    )
        }

    }
}