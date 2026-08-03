import react,{useState,useEffect,createContext,useContext} from 'react';
const initialUser = {
  name : "Rahul Sharma",
  email : "rahul@gmail.com",
  address : "Chandigarh"
};

const userContext = createContext();

function useUser(){
 return userContext(userContext);
}

function Navbar({user,cartCount}){
  return(
    <div style={{borderBottom : '2px solid black', paddingBottom : '10px',marginBottom :'20px'}}>
      <h2>Quick Bite - Food Ordering App</h2>
      <p>Welcome {user.name}</p>
      <p>Location :{user.location} | Cart : {cartCount} items</p>
    </div>
  );
}
function UserInfo({user}){
  return(
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
      <h3>Customer Details</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Location: {user.location}</p>
    </div>
  );
}
function FoodMenu({ user, onAddToCart }) {
  return (
    <div>
      <h3>FOOD MENU</h3>
      <div style={{ margin: '10px 0' }}>
        Pizza ₹299 <button onClick={onAddToCart}>Add to Cart</button>
      </div>
      <div style={{ margin: '10px 0' }}>
        Burger ₹149 <button onClick={onAddToCart}>Add to Cart</button>
      </div>
      <div style={{ margin: '10px 0' }}>
        Pasta ₹199 <button onClick={onAddToCart}>Add to Cart</button>
      </div>

      {/* Passing user down to UserInfo */}
      <UserInfo user={user} />
    </div>
  );
}
function Restaurant({ user, onAddToCart }) {
  return (
    <div>
      <FoodMenu user={user} onAddToCart={onAddToCart} />
    </div>
  );
}


function Home({ user, onAddToCart }) {
  return (
    <div>
      <Restaurant user={user} onAddToCart={onAddToCart} />
    </div>
  );
}
export default function App() {
  const [user] = useState(initialUser);
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  useEffect(() => {
    console.log(`Cart updated. Total items: ${cartCount}`);
  }, [cartCount]);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <Navbar user={user} cartCount={cartCount} />
      {/* Passing user prop through the hierarchy */}
      <Home user={user} onAddToCart={handleAddToCart} />
    </div>
  );
}