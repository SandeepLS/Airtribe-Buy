import { useState, useEffect } from 'react';
import { Grid, Card, Image, Text, Badge, Button, Group, Space } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    // Fetch cart data from localStorage when the component mounts
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('airtribe-user-cart')) || [];
        setCartItems(storedCart);
    }, []);

    const handleBuyProduct = (productId) => {
        // Alert for successful purchase
        alert('Purchase successful!');

        // Clear the cart after purchase
        //setCartItems([]);
        // localStorage.removeItem('airtribe-user-cart');

        // Remove the product from cart
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('airtribe-user-cart', JSON.stringify(updatedCart));

        // Remove the product from wishlist as well
        const storedWishlist = JSON.parse(localStorage.getItem('airtribe-user-wishlist')) || [];
        const updatedWishlist = storedWishlist.filter(item => item.id !== productId);
        localStorage.setItem('airtribe-user-wishlist', JSON.stringify(updatedWishlist));

        // Redirect to Cart page after purchase
            navigate('/products');
    };

    return (
        <section className="section_cart">
            {cartItems.length === 0 ? (
                <Text size="xl" fw={500} 
                style={{ 
                    textAlign: 'center',
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh',
                    color:'white'
                 }}
                >
                No items in your wishlist...
            </Text>
            ) : (
                <>
                    <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {cartItems.map((product) => (
                            <Grid.Col key={product.id} span={{ base: 12, md: 6, lg: 3 }} ml='1rem'>
                                <Card
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '92%',
                                    }}
                                >
                                    <Card.Section>
                                        <Image
                                            src={product.image}
                                            alt={product.model}
                                            fit="contain"
                                            height={100}
                                        />
                                    </Card.Section>

                                    <Group justify="space-between" mt="md" mb="xs">
                                        <Text fw={500}>{product.title}</Text>
                                    </Group>

                                    <Group justify="space-between" mt="md" mb="xs">
                                        <Text fw={500} fz={25}>${product.price}</Text>
                                        <Badge color="pink">{product.category}</Badge>
                                    </Group>

                                    <div className="desc_scroll" style={{
                                        flex: 1,
                                        overflow: 'auto',
                                        maxHeight: '100px',
                                        marginBottom: '1rem',
                                        textAlign: 'start',
                                        cursor: 'pointer',
                                    }}>
                                        <Text size="sm" c="dimmed">
                                            {product.description}
                                        </Text>
                                    </div>

                                    <Group display='flex' justify="space-between" mt="auto" mb="xs">
                                        <Button
                                            color="green"
                                            radius="md"
                                            onClick={() => handleBuyProduct(product.id)}
                                        >
                                            Buy the product
                                        </Button>
                                    </Group>
                                </Card>
                            </Grid.Col>
                        ))}
                    </Grid>
                    <Space h="xl" />
                </>
            )}
        </section>
    );
};

export default Cart;
