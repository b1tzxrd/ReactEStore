import { Checkbox } from "@/components/ui/checkbox"
import { Card, Box, HStack, Badge, Button, Image, Text } from "@chakra-ui/react";
import { FaLaptop, FaPlaystation, FaXbox } from "react-icons/fa";
import { ICartItem } from "@/types/cartTypes";
import { cartService } from "@/services/cartService";


interface CartItemCardProps {
    item: ICartItem;
    isSelected: boolean;
    checkboxVisible: boolean;
    onSelect: () => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, isSelected, onSelect, checkboxVisible }) => {

    const { mutate: removeFromCart } = cartService.useRemoveFromCart();

    return (
        <Card.Root flexDirection="row" overflow="hidden" size="sm" key={item.id} pos="relative" boxShadow="lg" p={2} >
            <Checkbox checked={isSelected} onCheckedChange={onSelect} colorPalette="teal" variant="outline" pos="absolute" top={2} right={5} display={checkboxVisible ? "inline-flex" : "none"} ></Checkbox>
            <Image
                objectFit={{ base: "contain", md: "cover" }}
                maxW={{ base: "110px", sm: "150px" }}
                maxH="full"
                src={item.image}
                alt={item.name}
                rounded={8}
            />
            <Box>
                <Card.Body gap={1} mt={checkboxVisible ? 4 : 0} >
                    <Card.Title>{item.name}</Card.Title>
                    <HStack >
                        <Badge colorPalette={item.colorPalette} >
                            {
                                item.platform === "pc" ? <FaLaptop /> :
                                    item.platform === "ps" ? <FaPlaystation /> :
                                        item.platform === "xbox" ? <FaXbox /> : null
                            }
                        </Badge>
                        <Badge colorPalette="cyan" > {item.genre} </Badge>
                    </HStack>
                    <Text>{item.price} ₸</Text>
                </Card.Body>
                <Card.Footer p={2} >
                    <Button colorPalette="cyan" variant="outline" size="xs" >Купить</Button>
                    <Button onClick={() => removeFromCart(item.gameId)} colorPalette="red" size="xs" variant="ghost" >Удалить</Button>
                </Card.Footer>
            </Box>
        </Card.Root>
    )
}

export default CartItemCard;