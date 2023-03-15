import NavBar from "./NavBar";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
