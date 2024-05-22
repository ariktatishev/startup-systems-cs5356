import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

const NavBar = () => {
  // Redirect to Home Page Before Smooth Scroll
  const router = useRouter();
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [targetIdToScroll, setTargetIdToScroll] = useState(null);

  // Manage Routing
  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setIsRouteChanging(false);
      if (targetIdToScroll) {
        const target = document.getElementById(targetIdToScroll);
        if (target) {
          smoothScroll(targetIdToScroll);
        }
        setTargetIdToScroll(null);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events, targetIdToScroll]);

  // Smooth Scroll Function
  const smoothScroll = (targetId) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle Click Event
  const handleClick = (targetId) => {
    return () => {
      const target = document.getElementById(targetId);
      if (target) {
        smoothScroll(targetId);
      } else {
        setIsRouteChanging(true);
        setTargetIdToScroll(targetId);
        router.push("/");
      }
    };
  };

  return (
    <nav
      className="navbar navbar-color"
      role="navigation"
      aria-label="main navigation"
      style={{ paddingBottom: "16px", paddingTop: "16px" }}
    >
      {/* Title Start */}
      <div className="navbar-start">
        <div className="navbar-brand">
          <Link href="/" className="navbar-item">
            <Image
              src="https://i.imgur.com/R6NIc26.png"
              alt="Pibble Pet Logo"
              width={120}
              height={54}
              style={{ width: "auto", height: "100%" }}
            />
          </Link>
        </div>
      </div>
      {/* Title End */}

      {/* Redirecting Nav-Bar Start */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginLeft: "auto",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Link href="/app/products">
          <span className="navbar-item">Catalog</span>
        </Link>
        <a className="navbar-item" onClick={handleClick("sampleProduct")}>
          Explore Pibble Products
        </a>
        <a className="navbar-item" onClick={handleClick("whyPibble")}>
          Why Pibble?
        </a>
      </div>
      {/* Redirecting Nav-Bar End */}

      {/* User Section Start */}
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <SignedIn>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link href="/app/dashboard">
                  <button
                    className="navbar-button"
                    style={{ marginRight: "20px" }}
                  >
                    Dashboard
                  </button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <div style={{ display: "flex", alignItems: "center" }}>
                <SignInButton mode="modal">
                  <button className="navbar-button">Sign In</button>
                </SignInButton>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
      {/* User Section End */}
    </nav>
  );
};

export default NavBar;
