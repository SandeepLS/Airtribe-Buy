import { useState, useEffect } from 'react';
import { Grid, Card, Image, Text, Badge, Button, Group, Space } from '@mantine/core';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    // Fetch wishlist data from localStorage when the component mounts
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('airtribe-user-wishlist')) || [];
        setWishlistItems(storedWishlist);

        const storedCart = JSON.parse(localStorage.getItem('airtribe-user-cart')) || [];
        setCartItems(storedCart);
    }, []);

    // Function to handle adding product to cart
    const handleAddToCart = (product) => {
        const updatedCart = [...cartItems, product];
        setCartItems(updatedCart);
        localStorage.setItem('airtribe-user-cart', JSON.stringify(updatedCart));
    };

    // Check if the product is already in the cart
    const isInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    return (
        <section className="section_wishlist">
            {wishlistItems.length === 0 ? (
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
                <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {wishlistItems.map((product) => (
                        <Grid.Col key={product.id} span={{ base: 12, md: 6, lg: 3 }} ml='1rem' mt='1rem' >
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
                                        color="red"
                                        radius="md"
                                        ml='-12px'
                                        onClick={() => {
                                            const updatedWishlist = wishlistItems.filter(item => item.id !== product.id);
                                            setWishlistItems(updatedWishlist);
                                            localStorage.setItem('airtribe-user-wishlist', JSON.stringify(updatedWishlist));
                                        }}
                                    >
                                        Remove from Wishlist
                                    </Button>

                                    <Button
                                        color="rgba(7,27,82,1)"
                                        radius="md"
                                        onClick={() => handleAddToCart(product)}
                                        disabled={isInCart(product.id)}
                                        
                                        style={{
                                            color: isInCart(product.id) ? 'lightgray' : '',
                                            cursor: isInCart(product.id) ? 'not-allowed' : 'pointer'
                                        }}
                                        
                                    >
                                        {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                                    </Button>
                                </Group>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            )}
            <Space h="xl" />
        </section>
    );
};

export default Wishlist;
