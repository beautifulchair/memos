type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <main className="m-6 md:m-10">{children}</main>
    </>
  );
};

export default MainLayout;
