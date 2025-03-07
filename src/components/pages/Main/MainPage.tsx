import Advantages from "@/components/Advantages/Advantages";
import Banner from "@/components/Banner/Banner";
import Categories from "@/components/Categories/Categories";
import DiscountSection from "@/components/DiscountSection/DiscountSection";
import PopularGoods from "@/components/PopularGoods/PopularGoods";
import { Box, Container } from "@chakra-ui/react";


const MainPage = () => {

    return (
        <Box bgColor="Background" >
            <Container py={[10]} >
                <Banner />
                <PopularGoods />
                <Categories/>
                <DiscountSection/>
                <Advantages />
            </Container >
        </Box>
    );
}

export default MainPage
