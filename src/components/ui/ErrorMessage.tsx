
type Props = {
  message?: string;
};

const ErrorMessage = ({ message = "Something went wrong." }: Props) => {
  return (
    <div className="text-center text-red-600 py-6 text-sm font-medium">
      {message}
    </div>
  );
};

export default ErrorMessage;
