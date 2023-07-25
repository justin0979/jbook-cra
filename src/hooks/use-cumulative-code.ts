import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const cumulativeCode = [
      `
        import _React from "react";
        import _ReactDOM from "react-dom/client";

        const show = (value) => {
          const root = document.getElementById("root");

          if (typeof value === "object") {
            if (value.$$typeof && value.props) {
              _ReactDOM.createRoot(root).render(value);
            } else {
              root.innerHTML = JSON.stringify(value);
            }
          } else {
            root.innerHTML = value;
          }
        }
      `,
    ];
    for (let c of orderedCells) {
      if (c.type === "code" && c.id === cellId) {
        cumulativeCode.push(c.content);
        break;
      } else if (c.type === "code") {
        const regex = /show\((\s|\S)+\)/g;
        //const regex = /show(.)+/g;
        const check = c.content.replace(regex, "");

        cumulativeCode.push(check);
      }
    }

    return cumulativeCode;
  }).join("\n");
};
