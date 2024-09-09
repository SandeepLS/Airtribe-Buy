import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Card, Image, Text, Badge, Button, Group, Space, Pagination, Select } from '@mantine/core';
import { notifications } from "@mantine/notifications";
import './Home.css';


const Home = () =>{
    const [products, setProducts] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const sectionRef = useRef(null);
    const [limit, setLimit] = useState(10);
    const navigate = useNavigate();
    const location = useLocation();

    
    // Initialize wishlist from localStorage with fallback to an empty array if null
    const wishlist = JSON.parse(localStorage.getItem('airtribe-user-wishlist')) || [];
    const [wishlistState, setWishlist] = useState([]);

    useEffect(() => {
        setWishlist(wishlist || []); // Always set to an array, even if null
    }, [wishlist]);


    useEffect(() =>{
         // Restore state from location only once on mount
         if (location.state) {
            setActivePage(location.state.activePage || 1);
            setLimit(location.state.limit || 10);
        }

        //if you are in bottom of the products page, When u click the pagination, it render top of the product page.
        if (sectionRef.current) {
            sectionRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
        async function fetchData() {
            const data = await fetch(`https://fakestoreapi.in/api/products?page=${activePage}&limit=${limit}`);
            const jsonData = await data.json();
            setProducts(jsonData.products);
        }
        fetchData();
        // fetch(`https://fakestoreapi.in/api/products?page=${activePage}&limit=${limit}`)
        // .then(res => res.json())
        // .then(res => setProducts(res.products))
        
    }, [activePage, limit, location.state])
    
    const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    console.log(product);

    //Here if user is authenticated/not
    const isAuth = localStorage.getItem('airtribe-user-auth');
    if (!isAuth || isAuth !== 'authenticated') {
        notifications.show({
            title: 'Un-authorized',
            message: 'You must be authorized to add to wishlist.',
            color: 'red',
        });
        return;
    }

    // Fetch wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('airtribe-user-wishlist')) || [];

    // Check if the product already exists in the wishlist
    const productExists = wishlist.some(item => item.id === product.id);
    if (productExists) {
        notifications.show({
            title: 'Already in wishlist!',
            color: 'red',
        });
        return;
    }

    // Add the product to the wishlist
    wishlist.push(product);
    localStorage.setItem('airtribe-user-wishlist', JSON.stringify(wishlist));
    setWishlist(wishlist); // Update the state

    notifications.show({
        title: 'Added to wishlist!',
        color: 'green',
    });
};


    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('airtribe-user-cart')) || [];
        setCartItems(storedCart);
    }, []);

    // Function to handle adding product to cart
    const handleAddToCart = (product) => {
        const updatedCart = [...cartItems, product];
        setCartItems(updatedCart);
        localStorage.setItem('airtribe-user-cart', JSON.stringify(updatedCart));
        navigate('/products/cart');
    };

     // Check if the product is already in the cart
     const isInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    return (
        <>
        <section ref={sectionRef} className="section_Home">
            <Grid style={{justifyContent:'center', alignItems:'center'}}>
                {products?.map(product =>
                    <Grid.Col key={product.id} span={{ base: 12, md: 6, lg: 3 }}>
                        <Card
                            onClick={() =>{
                               
                                navigate(`/products/${product.id}`, {
                                    state: { activePage, limit },
                                    preventScrollReset: true,
                                })
                            }} 
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
                                // height={250}
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
                        <Space h='md' />

                        <div className="desc_scroll" style={{
                                flex:1, 
                                overflow:'auto',
                                maxHeight:'100px', 
                                marginBottom:'1rem',
                                textAlign: 'start',
                                cursor:'pointer' 
                            }}>
                            <Text size="sm" c="dimmed">
                                {product.description}
                            </Text>
                        </div>
                        
                        <Group display='flex' justify="space-between" mt="auto"  mb="xs">   
                            <Button onClick={(e) => handleAddToWishlist(e, product)}
                                // color="#9eebcf"
                                // style={{color:'black'}}
                                // fullWidth mt="auto" 
                                radius="md"
                                disabled={wishlistState.find(item => item.id === product)}
                                color={wishlistState.find(item => item.id === product.id) ? '9eebcf' : '#9eebcf'}
                                style={{
                                    color: wishlistState.find(item => item.id === product.id) ? 'lightgray' : 'black', // Change text color when disabled
                                    cursor: wishlistState.find(item => item.id === product.id) ? 'not-allowed' : 'pointer' // Change cursor when disabled
                                }}
                                >
                                {wishlistState.find(item => item.id === product.id) ? 'Wishlisted' : 'Add to Wishlist'}
                            </Button>
                            {/* <Button onClick={(e) =>{
                                 e.stopPropagation();
                                }}
                                color="rgba(7,27,82,1)" 
                                // fullWidth mt="auto" 
                                radius="md"
                                >
                                Buy Now
                            </Button> */}
                            <Button 
                                        color="rgba(7,27,82,1)"
                                        radius="md"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product)
                                        }}
                                        disabled={isInCart(product.id)}
                                        
                                        style={{
                                            color: isInCart(product.id) ? 'lightgray' : '',
                                            cursor: isInCart(product.id) ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {isInCart(product.id) ? 'In Cart' : 'Buy Now'}
                                    </Button>
                        </Group>
                        </Card>
                    </Grid.Col>
                )}
            </Grid>
            <Space h='xl' />
            <Group justify="center">
                <Pagination value={activePage} onChange={setActivePage} total={Math.ceil(149/limit)} color="rgba(7,27,82,1)" />;
                <Select
                    value={limit}
                    onChange={setLimit}
                    placeholder="Set Your limit"
                    data={['10', '20', '30', '40']}
                />
            </Group>
            <Space h='xl' />
        </section>
        </>
    )
}

export default Home;