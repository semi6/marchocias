import { useState, useEffect } from "react";

type Props = {
  key: string;
  value: string;
};

const useLocalStorage = (props: Props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const item: string | null = localStorage.getItem(props.key);
    const localStorageValue: string = item ?? props.value;
    setValue(localStorageValue);
  }, [props]);

  return [value, setValue] as const;
};

export { useLocalStorage };