import { Box, Input, List, Card, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products";
import { Link } from "react-router-dom";
import { IProduct } from "@/types/productsTypes";

// type Product = {
//     id: string;
//     name: string;
//     image: string
// };

// const mockProducts: Product[] = [
//     { id: "1", name: "iPhone 15", image: "../../assets/gta5ps5.webp" },
//     { id: "2", name: "Samsung Galaxy S24", image: "../../assets/gta5ps5.webp" },
//     { id: "3", name: "MacBook Air", image: "../../assets/gta5ps5.webp" },
//     { id: "4", name: "iPad Pro", image: "../../assets/gta5ps5.webp" },
//     { id: "5", name: "Apple Watch1", image: "../../assets/gta5ps5.webp" },
//     { id: "6", name: "Apple Watch2", image: "../../assets/gta5ps5.webp" },
//     { id: "7", name: "Apple Watch3", image: "../../assets/gta5ps5.webp" },
//     { id: "8", name: "Apple Watch4", image: "../../assets/gta5ps5.webp" },
//     { id: "9", name: "Apple Watch5", image: "../../assets/gta5ps5.webp" },
// ];


const SearchBarDesk = () => {
    const query = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    })
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<IProduct[] | []>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.trim() === "") {
            setFilteredProducts([]);
        } else {
            const lowerCaseQuery = value.toLowerCase();
            const filtered = query.data?.filter(product =>
                product.name.toLowerCase().includes(lowerCaseQuery)
            ) || [];
            setFilteredProducts(filtered);
        }
    };

    return (
        <Box position="relative" maxW="xs" display={{ base: "none", lg: "block" }}>
            <Input
                width={"sm"}
                type="search"
                placeholder="Найти товар"
                value={searchQuery}
                onChange={handleChange}
            />
            {filteredProducts.length > 0 && (
                <Box
                    w={"sm"}
                    position="absolute"
                    top="100%"
                    left={0}
                    right={0}
                    bgColor="Background"
                    boxShadow="md"
                    zIndex={10}
                    mt={1}
                    borderRadius="md"
                    maxH="200px"
                    overflowY="auto"
                >
                    <List.Root gap={2}>
                        {filteredProducts.map(product => (
                            <List.Item
                                key={product.id}
                                onClick={() => console.log(`Выбран товар: ${product.name}`)}
                            >
                                <Link to={`/single-product/${product.id}`} onClick={() => setFilteredProducts([])} >
                                    <Card.Root flexDirection="row" overflow="hidden" size="sm" p={2} >
                                        <Image
                                            maxW="70px"
                                            maxH="full"
                                            src={product.image}
                                            alt={product.name}
                                            rounded={8}
                                        />
                                        <Box>
                                            <Card.Body gap={1} >
                                                <Card.Title>{product.name}</Card.Title>
                                            </Card.Body>
                                        </Box>
                                    </Card.Root>
                                </Link>
                            </List.Item>
                        ))}
                    </List.Root>
                </Box>
            )}
        </Box>
    );
};

export default SearchBarDesk;
