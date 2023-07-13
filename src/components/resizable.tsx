import "./resizable.css";
import { ReactNode } from "react";
import { ResizableBox } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: ReactNode;
}

const Resizable = ({ direction, children }: ResizableProps) => {
  return (
    <ResizableBox height={300} width={300} resizeHandles={["s"]}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
