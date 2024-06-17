import React from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";

function NavLink({ children, link }) {
  return (
    <Link href={link}>
      <div>
        <div className="">{children}</div>
      </div>
    </Link>
  );
}
function NavButton({ className, children, handler }) {
  return <div onClick={handler}>{children}</div>;
}
function Navbar() {
  const mounted = true;
  const user = true;
  const alert = {
    message:"hi how are you",
    type:"success"
  }
  const avatar = true;
  return (
    <div className={styles.navbar}>
      <div className={[styles.navbar_container]}>
        <div className={styles.nav_main}>
          <div className="brand-logo">
            <Link href="/">
            <div className={styles.logo_large}>
            <img src="./assets/insta_logo.png" alt="" />
            </div>
              
            </Link>
          </div>
          {mounted && (
            <div className={`${styles.searchbar} hidden lg: flex`}>
              <div className={styles.searchbox}>
                <div className={styles.search}>
                  <img src="/assets/search.svg" alt="" />
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
          )}

          {mounted ? (
            <div>
              {user ? (
                <div className={styles.navbar_buttons}>
                  <NavLink link="/">
                    <img src="/assets/home.svg" alt="" />
                  </NavLink>
                  <NavLink link="/direct">
                    <img src="/assets/messenger.svg" alt="" />
                  </NavLink>
                  <NavButton
                    handler={() => {
                      console.log("hanlded");
                    }}
                  >
                    <img src="/assets/new.svg" alt="" />
                  </NavButton>
                  <NavLink link="/explore">
                    <img src="/assets/explore.svg" alt="" />
                  </NavLink>
                  <NavButton >
                    <span >{alert.length}</span>
                    <img src="/assets/heart.svg" alt="" />
                  </NavButton>
                  <NavButton>
                    <div >
                        {user && avatar ?(
                            <img src="/assets/new.svg" alt="" />
                        ):(
                            <p>AKD</p>
                        )}
                    </div>
                  </NavButton>
                </div>
              ) : (
                <div className="auth_btn flex gap-2 item-center">
                    <Link href="/">
                    <div className="py-1 px-2 bg-sky-600 text-white">Login</div>
                    </Link>
                    <Link href="/">
                    <div className="py-1 px-2 bg-white text-sky-600 font-bold">
                      Signup
                    </div>
                    </Link>
                </div>
              )}
            </div>
          ) : (
            <div >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
