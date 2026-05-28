const UserCard = ({ user }) => {
  console.log("User in UserCard: ", user);
  const { firstName, lastName, age, location } = user || {};
  return (
    <div className="card bg-base-00 w-96 shadow-sm">
      <figure>
        <img
          src={
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          }
          alt="User Avatar"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{age} years old</p>
        <p>{location}</p>
        <div className="card-actions justify-end my-4">
          <button className="btn btn-secondary">Send request</button>
          <button className="btn btn-primary">Skip</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
