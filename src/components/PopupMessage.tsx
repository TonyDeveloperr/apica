

interface Props {
  children: string;
  isAlert?: boolean;
}

const PopupMessage = ({ children, isAlert = false }: Props) => {
  return (
    <div className={isAlert ? "popup alert" : "popup notif"}>
      <span>{children}</span>
    </div>
  );
};

export default PopupMessage;
