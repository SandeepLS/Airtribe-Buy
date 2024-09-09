import { useState, useEffect } from "react";
import { Group, Image, Stack, Button, Title, Text, Container, Divider } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
/*Which is use to, extract out the Parameters present inside on the current URL.
  It's take the look out the URL,  Searches for the exact dynamic parameter init.
*/

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const {id} = useParams();
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        fetch(`https://fakestoreapi.in/api/products/${id}`)
        .then(res => res.json())
        .then(res => setProduct(res.product))

        const storedCart = JSON.parse(localStorage.getItem('airtribe-user-cart')) || [];
        setCartItems(storedCart);
    }, [id])

    const handleBuyNow = () => {
      const isAuth = localStorage.getItem("airtribe-user-auth");

      if (isAuth && isAuth === "authenticated") {
          // User is authenticated, navigate to the checkout page
          navigate(`/checkout/${id}`);
      } else {
          // User is not authenticated, navigate to the login page
          navigate("/login");
      }

      const updatedCart = [...cartItems, product];
        setCartItems(updatedCart);
        localStorage.setItem('airtribe-user-cart', JSON.stringify(updatedCart));
        navigate("/products/cart")

  };

    return (
      <>
      <Container size="lg" style={{ padding: '2rem 0' }}>
      <Group align="center" position="apart" style={{ marginBottom: '2rem' }}>
        <Image
          radius="md"
          src={product?.image}
          fit="contain"
          height={350}
          width={300}
          style={{
            border: '1px solid #e0e0e0',
            padding: '1rem',
            backgroundColor: '#fafafa',
          }}
        />
        <Stack spacing="sm" style={{ flex: 1, marginLeft: '2rem' }}>
          <Title order={2} style={{ fontSize: '2rem', fontWeight: 600 }}>
            {product?.title}
          </Title>
          <Divider />
          <Text size="lg" color="white" style={{ textAlign: 'left' }}>
            {product?.description}
          </Text>
          <Text size="lg" weight={500} style={{ color: '#4CAF50', fontSize: '1.5rem' }}>
            Price: ${product?.price}
          </Text>
          <Button
            color="rgba(7,27,82,1)" 
            fullWidth mt="auto" 
            radius="md"
            size="lg"
            style={{ width: '200px', marginTop: '1rem' }}
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </Stack>
      </Group>
    </Container>
      </>
    );
};

export default ProductDetails;

// import { useState, useEffect } from "react";
// import { Group, Image, Stack, Rating, Button, Text, Accordion, Card } from "@mantine/core";
// import { useParams } from "react-router-dom";

// const ProductDetails = () => {
//   const [product, setProduct] = useState({});
//   const { id } = useParams();
  
//   useEffect(() => {
//     fetch(`https://fakestoreapi.in/api/products/${id}`)
//       .then(res => res.json())
//       .then(res => setProduct(res.product));
//   }, [id]);

//   return (
//     <Stack spacing="lg" p="md">
//       <Group align="start">
//         <Image
//           radius="md"
//           src={product?.image}
//           fit="contain"
//           height={350}
//           style={{ 
//             marginLeft: '2rem',
//             border: '1px solid #ddd',
//             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//           }}
//         />
//         <Stack spacing="sm">
//           <Text size="xl" weight={700}>{product?.title}</Text>
//           <Rating value={4.5} readOnly />
//           <Text size="lg" weight={500}>${product?.price}</Text>
//           <Text>{product?.description}</Text>
//           <Button color="teal" size="md">Buy Now</Button>
//           <Button variant="light" color="gray" mt="xs">Add to Wishlist</Button>
//         </Stack>
//       </Group>

//       <Accordion variant="separated" mt="lg" >
//         <Accordion.Item value="specifications">
//           <Accordion.Control>Specifications</Accordion.Control>
//           <Accordion.Panel>{product?.description}</Accordion.Panel>
//         </Accordion.Item>

//         <Accordion.Item value="reviews">
//           <Accordion.Control>Reviews</Accordion.Control>
//           <Accordion.Panel>No reviews yet</Accordion.Panel>
//         </Accordion.Item>
//       </Accordion>

//       <Text size="xl" mt="xl">Related Products</Text>
//       <Group spacing="md">
//         {/* Replace with dynamically loaded related products */}
//         <Card shadow="sm" padding="lg" radius="md" withBorder>
//           <Image
//             src="https://via.placeholder.com/150"
//             alt="Related Product"
//             fit="contain"
//             height={100}
//           />
//           <Text mt="sm" size="md">Related Product 1</Text>
//         </Card>
//         <Card shadow="sm" padding="lg" radius="md" withBorder>
//           <Image
//             src={product.image}
//             alt="Related Product"
//             fit="contain"
//             height={100}
//           />
//           <Text mt="sm" size="md">Related Product 2</Text>
//         </Card>
//         {/* Add more cards as needed */}
//       </Group>
//     </Stack>
//   );
// };

// export default ProductDetails;
