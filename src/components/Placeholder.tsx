import { FC } from "react";

interface PlaceholderProps {
  message: string;
}

const Placeholder: FC<PlaceholderProps> = ({ message }) => (
  <p className="text-2xl text-center border-2 border-dashed border-gray-300 p-5 rounded-lg w-full text-white">
    {message}
  </p>
);

export default Placeholder;