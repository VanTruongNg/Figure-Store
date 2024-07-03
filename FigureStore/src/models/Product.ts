interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    brand: string;
    scale: string;
    category: Category[]
    images: Image[];
}

interface Image {
    images: {
        id: string;
        url: string
    }
}

interface ProductDTO {
  name: string;
  description: string;
  price: number;
  brand: string;
  scale: string;
  category: string;
}
