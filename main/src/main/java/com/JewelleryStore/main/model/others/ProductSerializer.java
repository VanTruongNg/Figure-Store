package com.JewelleryStore.main.model.others;

import com.JewelleryStore.main.model.Product;
import com.JewelleryStore.main.model.ProductImage;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class ProductSerializer extends JsonSerializer<Product> {
    @Override
    public void serialize(Product product, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("id", product.getId().toString());
        jsonGenerator.writeStringField("name", product.getName());
        jsonGenerator.writeStringField("description", product.getDescription());
        jsonGenerator.writeNumberField("price", product.getPrice());
        jsonGenerator.writeStringField("brand", product.getBrand());
        jsonGenerator.writeStringField("scale", product.getScale());
        jsonGenerator.writeArrayFieldStart("category");
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("id", product.getCategory().getId().toString());
        jsonGenerator.writeStringField("name", product.getCategory().getName());
        jsonGenerator.writeEndObject();
        jsonGenerator.writeEndArray();

        // Other fields...
        jsonGenerator.writeArrayFieldStart("images");
        for (ProductImage image : product.getImages()) {
            jsonGenerator.writeStartObject();
            jsonGenerator.writeStringField("id", image.getId().toString());
            jsonGenerator.writeStringField("url", image.getUrl());
            // Other fields...
            jsonGenerator.writeEndObject();
        }
        jsonGenerator.writeEndArray();
        jsonGenerator.writeEndObject();
    }
}
