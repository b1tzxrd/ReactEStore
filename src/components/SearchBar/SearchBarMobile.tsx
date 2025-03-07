import { getProducts } from "@/api/products";
import { IProduct } from "@/types/productsTypes";
import { Box, List, Card, Image } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";


const SearchBarMobile = () => {
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
        <Box position="relative" display={{ base: "block", lg: "none" }} mt="5px"  >
            <Input
                type="search"
                placeholder="Найти товар"
                value={searchQuery}
                onChange={handleChange}
            />
            {filteredProducts.length > 0 && (
                <Box
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
                                <Link to={`/single-product/${product.id}`}>
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
    );;
}

export default SearchBarMobile;

{/* <Input type="search" placeholder="найти товар" minW="100%" mt="5px" display={{ base: "block", lg: "none" }} /> */ }