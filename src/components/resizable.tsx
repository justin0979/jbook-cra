import "./resizable.css";
import { ReactNode } from "react";
import { ResizableBox } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: ReactNode;
}

const Resizable = ({ direction, children }: ResizableProps) => {
  return (
    <ResizableBox
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      minConstraints={[10, 100]}
      height={300}
      width={Infinity}
      resizeHandles={["s"]}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
