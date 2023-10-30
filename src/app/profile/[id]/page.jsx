const userProfile = ({params}) => {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1 className="text-xl bg-red-500 w-1/3 flex justify-center h-11 items-center rounded-lg">Profile Page: {params.id}</h1>
      </div>
    );
  };
  
  export default userProfile;