export const fetcher = async <T>(url: string): Promise<T> => {
    const res = await fetch(url);

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const errorMessage = JSON.parse(await res.text());
        throw new Error(errorMessage.message);
    }

    return res.json();
};
