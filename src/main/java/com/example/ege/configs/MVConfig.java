package com.example.ege.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.thymeleaf.extras.springsecurity6.dialect.SpringSecurityDialect;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.spring6.templateresolver.SpringResourceTemplateResolver;
@Configuration
public class MVConfig extends WebMvcConfigurationSupport {
    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {
            "classpath:/META-INF/resources/", "classpath:/resources/",
            "classpath:/static/", "classpath:/public/"};

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("classpath:/resources/");

        registry.addResourceHandler("/static/css/**")
                .addResourceLocations("classpath:/static/css/");

        registry.addResourceHandler("/static/js/**")
                .addResourceLocations("classpath:/static/js/");

        registry.addResourceHandler("/static/img/**")
                .addResourceLocations("classpath:/static/img/");

        registry.addResourceHandler("/public/avatars/**")
                .addResourceLocations("classpath:/public/avatars/");
    }
    @Bean
    public SpringTemplateEngine templateEngine(SpringResourceTemplateResolver defaultTemplateResolver) {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(defaultTemplateResolver);
        templateEngine.addDialect(new SpringSecurityDialect());
        return templateEngine;
    }
}
