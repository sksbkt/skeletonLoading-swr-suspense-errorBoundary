import Nav from "./Nav"

function Header({ currentUserId, setCurrentUserId }) {
    return (
        <header>
            <h1>Acme Blogs</h1>
            <Nav
                currentUserId={currentUserId}
                setCurrentUserId={setCurrentUserId} />
        </header>
    )
}
export default Header