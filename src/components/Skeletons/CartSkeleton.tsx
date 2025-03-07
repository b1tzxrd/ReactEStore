import { VStack, Skeleton } from "@chakra-ui/react";

export const CartSkeleton = () => (
    <VStack gap={4}>
        <Skeleton height="40px" width="80%" />
        {[...Array(4)].map((_, i) => (
            <Skeleton key={i} height="80px" width="100%" />
        ))}
    </VStack>
);
