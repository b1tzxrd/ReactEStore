import { Stack, Skeleton, VStack } from "@chakra-ui/react";


const CartItemCardSkeleton = () => {
    return (
        <Stack flexDirection="row" overflow="hidden" w="sm" pos="relative" boxShadow="lg" p={2} >
            <Skeleton css={{ "--start-color": "colors.teal.500", "--end-color": "colors.cyan.400", }} variant="shine" height="100px" width="100px" />
            <VStack w="full" display="flex" alignItems="center" justifyContent="center" >
                <Skeleton css={{ "--start-color": "colors.teal.500", "--end-color": "colors.cyan.400", }} variant="shine" height="20px" width="full" />
                <Skeleton css={{ "--start-color": "colors.teal.500", "--end-color": "colors.cyan.400", }} variant="shine" height="20px" width="full" />
                <Skeleton css={{ "--start-color": "colors.teal.500", "--end-color": "colors.cyan.400", }} variant="shine" height="20px" width="full" />
            </VStack>
        </Stack>
    )
}


export default CartItemCardSkeleton;