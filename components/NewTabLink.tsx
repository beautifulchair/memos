type Props = {
  children: React.ReactNode;
  href: string | undefined;
  className?: string;
};

const NewTabLink = ({ children, href, className = "" }: Props) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={"hover:underline " + className}
  >
    {children}
  </a>
);

export default NewTabLink;
