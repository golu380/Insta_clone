import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Auth.module.css";
// import { error } from "console";
import Link from "next/link";
import { auth, firebase, db, storage } from "../../../firebaseConfig"
import { getFirestore,doc,setDoc } from "firebase/firestore";
// import { fromJSON } from "postcss";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
// import { log } from "console";
// import { create } from "domain";
// import { stat } from "fs";
// import { setServers } from "dns";



function FormControl({ placeholder, type, value, setValue }) {
  return (
    <div className={styles.form_control}>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState(false)
  const [saved,setSaved] = useState(false);
  const [changed, setChaned] = useState(false)
  const router = useRouter();
  const {authType} = router.query;
//   const error = {
//     message: "there occurs an error",
//     message: "there occurs an error",
//   };

  useEffect(()=>{
    setEmail("");
    setName("");
    setUsername("");
    setPassword("");
    setError(false);
    setSaved(false);
    setChaned(false);

    
  },[router.query])
//   const authType = "create";

const handleCreate = (e) =>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        const user = userCredential.user
        console.log(user);
        createNewUserData(user);
    }).catch((error)=>{
        const errorCode = error.code;
        console.log("Error while Creating ", error);
        if (errorCode === "auth/email-already-in-use") {
          setError({ message: "Email already in use" });
          setEmail("");
          setPassword("");
          setName("");
          setUsername("");
        }
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    })
}

async function createNewUserData(user){
    console.log("user after creating ",user);
    console.log(db)
    const collectionRef = doc(db,"users",user.uid)
    console.log(collectionRef)
    let ip = await fetch("https://api.ipify.org/?format=json")
    let ipData = await ip.json();
    let ipAddress = ipData.ip;
    setDoc(collectionRef,{
        saved_posts: [],
        avatar : `https://avatars.dicebear.com/api/micah/${name}.svg`,
        uid:user.uid,
        email:user.email,
        username:username,
        name:name,
        last_ip: ipAddress,
        created_at: new Date(),
        updated_at: new Date(),
        status : "online",
        contacts:[],
        account_type: "personal"

    }).then(function(docref){
        console.log(docref);
        router.push("/");
    }).catch(function (err){
        console.error("Error adding documents: ",err)
    })
}
  return (
    <div className={styles.auth_container}>
      <div>
        <div className={styles.auth_box}>
          <div className={styles.auth_box_content}>
            <h3>
              <img src="/assets/insta_logo.png" alt="" />
            </h3>
            <p className="text-gray-500 font-bold">
              Sign up to see photos and videos from your friends.
            </p>
            <form className="mt-5"
            onSubmit={authType === "login" ? hanldeLogin : handleCreate}
            >
              <FormControl
                type="email"
                placeholder="Email address"
                value={email}
                setValue={setEmail}
              />
              {authType == "create" && (
                <>
                  <FormControl
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    setValue={setName}
                  />
                  <FormControl
                    type="text"
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                  />
                </>
              )}
              <FormControl
                type="password"
                placeholder="Password"
                value={password}
                setValue={setPassword}
              />
              <input
                type="submit"
                value={authType === "create" ? "Sign Up" : "Log In"}
                className="flex item-center justify-center text-white bg-sky-200 px-5 w-full py-2 cursor-pointer mb-5"
              />
            </form>
            {error && (
              <p className="error text-center text-red-500 font-semibold">
                {error.message}
              </p>
            )}
            <p className="text-gray-400 text-center">
              By signing up, you agree to our{" "}
              <strong>
                <Link href="#">Terms</Link>
              </strong>
              ,{" "}
              <strong>
                <Link href="#">Data Policy </Link>
              </strong>
              and{" "}
              <strong>
                <Link href="#">Cookie Policy</Link>
              </strong>
              .
            </p>
          </div>
        </div>
        <div className={styles.auth_switcher}>
          <p>
            {authType === "create" ? "Already" : `Don't`} have an account?{" "}
            <Link
              href={`/accounts/auth${
                authType === "login" ? "/create" : "/login"
              }`}
            >
              <span className="text-sky-500">
                {authType === "login" ? "Sign Up" : "Login"}
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
