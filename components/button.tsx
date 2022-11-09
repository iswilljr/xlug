const Button = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`flex items-center rounded-md px-4 py-2 hover:transition duration-200 ease-in-out focus:outline-none ${
        className ?? ""
      } focus:ring-1 focus:ring-offset-1 focus:ring-offset-stone-800 focus:ring-gray-500`}
      {...props}
    />
  );
};

export default Button;
