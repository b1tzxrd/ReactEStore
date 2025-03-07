
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../../styles/carousel-similar.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Card, Button } from '@chakra-ui/react';

const SimilarProducts = () => {
    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper-similar"
            >
                <SwiperSlide>
                    <Card.Root width="320px">
                        <Card.Body gap="2">
                            <Card.Title mt="2">Nue Camp</Card.Title>
                            <Card.Description>
                                This is the card body. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
                                Curabitur nec odio vel dui euismod fermentum.
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end">
                            <Button variant="outline">View</Button>
                            <Button>Join</Button>
                        </Card.Footer>
                    </Card.Root>
                </SwiperSlide>
                <SwiperSlide>
                    <Card.Root width="320px">
                        <Card.Body gap="2">
                            <Card.Title mt="2">Nue Camp</Card.Title>
                            <Card.Description>
                                This is the card body. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
                                Curabitur nec odio vel dui euismod fermentum.
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end">
                            <Button variant="outline">View</Button>
                            <Button>Join</Button>
                        </Card.Footer>
                    </Card.Root>
                </SwiperSlide>
                <SwiperSlide>
                    <Card.Root width="320px">
                        <Card.Body gap="2">
                            <Card.Title mt="2">Nue Camp</Card.Title>
                            <Card.Description>
                                This is the card body. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
                                Curabitur nec odio vel dui euismod fermentum.
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end">
                            <Button variant="outline">View</Button>
                            <Button>Join</Button>
                        </Card.Footer>
                    </Card.Root>
                </SwiperSlide>
                <SwiperSlide>
                    <Card.Root width="320px">
                        <Card.Body gap="2">
                            <Card.Title mt="2">Nue Camp</Card.Title>
                            <Card.Description>
                                This is the card body. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
                                Curabitur nec odio vel dui euismod fermentum.
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end">
                            <Button variant="outline">View</Button>
                            <Button>Join</Button>
                        </Card.Footer>
                    </Card.Root>
                </SwiperSlide>
                <SwiperSlide>
                    <Card.Root width="320px">
                        <Card.Body gap="2">
                            <Card.Title mt="2">Nue Camp</Card.Title>
                            <Card.Description>
                                This is the card body. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
                                Curabitur nec odio vel dui euismod fermentum.
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end">
                            <Button variant="outline">View</Button>
                            <Button>Join</Button>
                        </Card.Footer>
                    </Card.Root>
                </SwiperSlide>
                <SwiperSlide>
                    <Card.Root width="320px">
                        <Card.Body gap="2">
                            <Card.Title mt="2">Nue Camp</Card.Title>
                            <Card.Description>
                                This is the card body. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
                                Curabitur nec odio vel dui euismod fermentum.
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end">
                            <Button variant="outline">View</Button>
                            <Button>Join</Button>
                        </Card.Footer>
                    </Card.Root>
                </SwiperSlide>
                <SwiperSlide>
                    <Card.Root width="320px">
                        <Card.Body gap="2">
                            <Card.Title mt="2">Nue Camp</Card.Title>
                            <Card.Description>
                                This is the card body. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
                                Curabitur nec odio vel dui euismod fermentum.
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end">
                            <Button variant="outline">View</Button>
                            <Button>Join</Button>
                        </Card.Footer>
                    </Card.Root>
                </SwiperSlide>
                <SwiperSlide>
                    <Card.Root width="320px">
                        <Card.Body gap="2">
                            <Card.Title mt="2">Nue Camp</Card.Title>
                            <Card.Description>
                                This is the card body. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
                                Curabitur nec odio vel dui euismod fermentum.
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end">
                            <Button variant="outline">View</Button>
                            <Button>Join</Button>
                        </Card.Footer>
                    </Card.Root>
                </SwiperSlide>
                <SwiperSlide>
                    <Card.Root width="320px">
                        <Card.Body gap="2">
                            <Card.Title mt="2">Nue Camp</Card.Title>
                            <Card.Description>
                                This is the card body. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
                                Curabitur nec odio vel dui euismod fermentum.
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer justifyContent="flex-end">
                            <Button variant="outline">View</Button>
                            <Button>Join</Button>
                        </Card.Footer>
                    </Card.Root>
                </SwiperSlide>
            </Swiper>
        </>
    )
}


export default SimilarProducts