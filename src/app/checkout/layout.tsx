import CheckoutSteps from "./checkout-steps";

const CheckoutLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <CheckoutSteps />
      <div className="mt-8">{children}</div>
    </div>
  );
};

export default CheckoutLayout;
