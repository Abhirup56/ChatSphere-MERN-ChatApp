import React from 'react';
import User from './User';
import UserGetAllUser from '../../context/UserGetAllUser';

function Users() {
  const [alluser, loading] = UserGetAllUser();

  return (
    <div className='overflow-y-auto max-h-[70vh] p-2'>
      <div className="space-y-3">
        {alluser.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
