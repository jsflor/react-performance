import React from 'react';
import { v4 as uuidv4 } from 'uuid';
 
const App = () => {
  console.log('Render: App');

  const [users, setUsers] = React.useState([
    { id: 'a', name: 'Robin' },
    { id: 'b', name: 'Dennis' },
  ]);

  const [search, setSearch] = React.useState('');
  const [text, setText] = React.useState('');

  const handleText = (event) => {
    setText(event.target.value);
  };
 
  const handleAddUser = ()  =>{
    setUsers(users.concat({ id: uuidv4(), name: text }));
  };
 
  // memoize a function
  const handleRemove = React.useCallback(
    (id) => setUsers(users.filter((user) => user.id !== id)),
    [users]
    );

    const handleSearch = () => {
      setSearch(text);
    };
   
    // memoize a value
    const filteredUsers = React.useMemo(
      () => 
      users.filter((user) => {
      console.log('Filter function is running ...');
      return user.name.toLowerCase().includes(search.toLowerCase());
    }), [search]
    );
   
 
  return (
    <div>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleAddUser}>
        Add User
      </button>
      <button type="button" onClick={handleSearch}>
        Search
      </button>
 
      <List list={filteredUsers} onRemove={handleRemove} />
    </div>
  );
};
 
// wrap React component to prevent re-renderings
const List = React.memo(({ list, onRemove }) => {
  console.log('Render: List');
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </ul>
  );
});
 
// wrap React component to prevent re-renderings
const ListItem = React.memo(({ item, onRemove }) => {
  console.log('Render: ListItem');
  return (
    <li>
      {item.name}
      <button type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  );
});
 
export default App;
