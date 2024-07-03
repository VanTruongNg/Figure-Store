import { FC, ReactNode } from "react";

interface FlexProps {
  children: ReactNode;
  className: string;
}

const Flex: FC<FlexProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default Flex;
