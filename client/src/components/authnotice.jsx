export default function AuthNotice({ setIsAuthModalOpen }) {
  return (
    <div className="flex flex-col justify-center max-w-5xl m-1 md:mx-auto bg-primary p-2 mt-2 rounded ">
      <p className="md:text-center">
        You're not logged in. To add or delete a task, please log in or create
        an account by{" "}
        <span
          onClick={() => {
            setIsAuthModalOpen(true);
          }}
          className="font-bold underline cursor-pointer"
        >
          clicking here
        </span>
        .
      </p>
    </div>
  );
}
