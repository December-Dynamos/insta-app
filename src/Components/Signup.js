import React,{useState, useContext, useEffect} from "react";
import axios from "axios"; 
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";



const Signup = () => {
    const [user, setUser] = useState({name:"",email:"",password:"",confirmPassword:""});
    const [message, setMessage] = useState("");
    const {setToken} = useContext(UserContext);

    const navigate = useNavigate();

      
      useEffect(()=>{
            let localTokenJSON = localStorage.getItem("token"); 
            if(localTokenJSON != undefined){
                navigate("/dashboard")
            }
      },[])


      function updateUser(e){
          console.log("key",e.target.name)
          console.log("value",e.target.value)
          let key = e.target.name;
          setUser({...user, [key]:e.target.value})
         
      }

      async function implementSignup(e){
            e.preventDefault();
            if(!user.name || !user.email || !user.password || !user.confirmPassword){
                setMessage("Please fill all the fields")
                return;
            }
            if(user.password !== user.confirmPassword){
                setMessage("Password and Confirm Password do not match")
                return;
            }



            try{
                const response =  await axios.post("https://instagram-express-app.vercel.app/api/auth/signup",{
                    name:user.name,
                    email:user.email,
                    password:user.password,
                })
                console.log("Success",response.data.message)
                console.log("status",response.status)
                setMessage(response.data.message)
                console.log("token",response.data.data.token)
                setToken(response.data.data.token)
                // add token to localstorage:
                let jsonToken = JSON.stringify(response.data.data.token)
                localStorage.setItem("token", jsonToken )

                setUser({name:"",email:"",password:"",confirmPassword:""})

                setTimeout(()=>navigate("/dashboard"), 2000)
              }
            catch(error){
                console.log("Error", error.response.data.message)
                console.log("status", error.response.status)
                setMessage(error.response.data.message)
            }    
      }

    return (
        <div>
            <h1>Signup</h1>
            {
                message && <h2>{message}</h2>
            }
            <form onSubmit={implementSignup}>
                <input type="text" placeholder="Name" name="name"
                  onChange={updateUser}
                  value={user.name}
                />
                <br />
                <input type="email" placeholder="Email"  name="email"
                    onChange={updateUser}
                    value={user.email}
                />
                <br />
                <input type="password" placeholder="Password"  name="password"
                    onChange={updateUser}
                    value={user.password}
                />
                <br />
                <input type="password" placeholder="Confirm Password"  name="confirmPassword"
                    onChange={updateUser}
                    value={user.confirmPassword}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Signup;






// function updateName(e){
//     setUser({...user, name:e.target.value})    
// }
// function updateEmail(e){
//    setUser({...user, email:e.target.value})
// }
// function updatePassword(e){
//    setUser({...user, password:e.target.value})
// }
// function updateConfirmPassword(e){
//    setUser({...user, confirmPassword:e.target.value})
// }