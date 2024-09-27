package com.example.Demo.Test;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.Demo.Train1Application;

import org.springframework.web.client.RestTemplate;

import static org.mockito.Mockito.verify;

@SpringBootTest
class Train1ApplicationTests {

    @MockBean
    private WebMvcConfigurer webMvcConfigurer;

    @MockBean
    private CorsRegistry corsRegistry;

    @Test
    void contextLoads() {
        // Ensure that the Spring application context loads successfully
    }

    @Test
    void restTemplateBeanCreationTest() {
        // Ensure that the RestTemplate bean is created
        Train1Application train1Application = new Train1Application();
        RestTemplate restTemplate = train1Application.restTemplate();
        assert restTemplate != null;
    }

    @Configuration
    static class TestConfig {
        @Bean
        public Train1Application train1Application() {
            return new Train1Application();
        }
    }

    @Test
    void corsConfigurerBeanCreationTest() {
        // Ensure that the CorsConfigurer bean is created
        Train1Application train1Application = new Train1Application();
        WebMvcConfigurer corsConfigurer = train1Application.corsConfigurer();
        assert corsConfigurer != null;
    }

    @Test
    void corsMappingsTest() {
        // Arrange
        Train1Application train1Application = new Train1Application();
        WebMvcConfigurer configurer = train1Application.corsConfigurer();

        // Act
        configurer.addCorsMappings(corsRegistry);

        // Assert
        verify(corsRegistry).addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:3001")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}

