import NextLink, { LinkProps as NextLinkProps } from "next/link";

type LinkProps = NextLinkProps & React.HtmlHTMLAttributes<HTMLAnchorElement>;

const Link = ({ className, ...props }: LinkProps) => (
  <NextLink
    className={`p-2 cursor-pointer hover:text-gray-300 duration-200 transition-all bg-secondary rounded-md flex items-center ${
      className ?? ""
    }`}
    {...props}
  />
);

export default Link;
