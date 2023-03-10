import React from "react";

import styles from "../styles/TodoDescTooltip.module.scss";

interface ITodoDescTooltipProps {
  description: string;
}

const TodoDescTooltip = ({ description }: ITodoDescTooltipProps) => {
  return (
    <div className={styles.tooltip}>
      {description ? description : "not description"}
      <span className={styles.arrow}>&#9660;</span>
    </div>
  );
};

export default TodoDescTooltip;
