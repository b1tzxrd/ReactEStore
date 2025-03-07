import { Flex, Skeleton, HStack } from "@chakra-ui/react"

const gradientColor = {
    "--start-color": "colors.teal.500",
    "--end-color": "colors.cyan.500",
}

const SkeletonCard = () => {
    return (
        <Flex
            flexDir="column"
            justifyContent="space-between"
            w={"100%"}
            gap={3}
            p={1}
            bgColor="white"
            borderRadius="md"
            boxShadow="lg"
            _dark={{ bgColor: "bg.muted" }}
        >
            {/* Image Skeleton */}
            <Skeleton css={gradientColor} variant="shine" height="150px"  borderRadius="md" />

            {/* Title Skeleton */}
            <Skeleton css={gradientColor} variant="shine" height="20px" width="80%" />

            {/* Badges Skeleton */}
            <HStack>
                <Skeleton css={gradientColor} variant="shine" height="20px" width="50px" />
                <Skeleton css={gradientColor} variant="shine" height="20px" width="50px" />
            </HStack>

            {/* Price and Actions */}
            <Flex justifyContent="space-between" alignItems="center">
                <Skeleton css={gradientColor} variant="shine" height="24px" width="60px" />
                <HStack>
                    <Skeleton css={gradientColor} variant="shine" height="30px" width="30px" borderRadius="full" />
                    <Skeleton css={gradientColor} variant="shine" height="30px" width="30px" borderRadius="full" />
                </HStack>
            </Flex>
        </Flex>
    )
}

export default SkeletonCard
