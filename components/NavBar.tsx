import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBox from "./SearchBox";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <Link href="/" legacyBehavior>
        <Image src="/movie-icon.png" alt="logo" width="250" height="100" />
      </Link>
      <div className="searchBox">
        <SearchBox />
      </div>
      <div>
        <Link href="/now-playing" legacyBehavior>
          <a className={router.pathname === "/now-playing" ? "active" : ""}>
            Now Playing
          </a>
        </Link>
        <Link href="/upcoming" legacyBehavior>
          <a className={router.pathname === "/upcoming" ? "active" : ""}>
            Upcoming
          </a>
        </Link>
        <Link href="/top-movie" legacyBehavior>
          <a className={router.pathname === "/top-movie" ? "active" : ""}>
            Top Movie
          </a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          justify-content: space-between;
          align-items: center;
          padding: 20px 20px 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
          position: relative;
        }
        .searchBox {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        img {
          max-width: 250px;
          margin-bottom: 5px;
          cursor: pointer;
        }
        nav a {
          font-weight: 600;
          font-size: 18px;
          padding: 0 5px;
        }
        .active {
          color: #af1f37;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
}
