interface Props {
    message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
    return <h1>Error: {message}</h1>;
};
