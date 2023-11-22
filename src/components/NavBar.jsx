import  Auth  from './Auth'

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1>Todo List</h1>
      </div>
      <Auth/>
      
    </div>
  );
}

export default NavBar;
