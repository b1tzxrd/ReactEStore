import { Flex, Heading } from "@chakra-ui/react"
import Header from "./components/header/Header"
import MainPage from "./components/pages/Main/MainPage"
import { Route, Routes } from "react-router-dom"
import SingleProduct from "./components/pages/Products/SingleProduct"
import Products from "./components/pages/Products/Products"
import Profile from "./components/pages/Profile/Profile"
import Checkout from "./components/pages/Checkout/Checkout"
import ProfileEdit from "./components/pages/ProfileEdit/ProfileEdit"





const App: React.FC = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/single-product/:id" element={<SingleProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:platform" element={<Products />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/checkout/:orderId" element={<Checkout/>} />
        <Route path="/profile/edit" element={<ProfileEdit/>} />
      </Routes>
      <Flex as="footer" h="40px" bgColor="bg.panel" alignContent="center" alignItems="center" justifyContent="center" borderTop="1px solid gray">
        <Heading as="h4" color="GrayText" fontWeight="light" fontFamily="monospace" >
          Developed by b1tzxrd
        </Heading>
      </Flex>
    </>
  )
}

export default App