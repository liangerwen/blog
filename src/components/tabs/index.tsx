import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import cls from "classnames";

const TabContext = createContext({
  setTabs: (
    name: string,
    value: { children: ReactNode; title: ReactNode }
  ) => {},
});

interface TabItemProps {
  children: ReactNode;
  name: string;
  title: ReactNode;
}

export function TabItem({ children, name, title }: TabItemProps) {
  const { setTabs } = useContext(TabContext);

  useEffect(() => {
    setTabs(name, { children, title });
  }, [children, name, title]);

  return <></>;
}

interface TabProps {
  children: ReactNode;
}

export default function Tabs({ children }: TabProps) {
  const [tabs, setTabs] = useState<
    Record<string, { children: ReactNode; title: ReactNode }>
  >({});

  const [name, setName] = useState<string>();

  return (
    <TabContext.Provider
      value={{
        setTabs: (name, value) => {
          setTabs((tabs) => ({ ...tabs, [name]: value }));
        },
      }}
    >
      <div className="w-full">
        <div className="flex w-full flex-wrap">
          {Object.keys(tabs).map((k) => (
            <div
              key={k}
              className={cls(
                "p-2 bg-orange-300 cursor-pointer",
                name === k && "bg-gray-400"
              )}
              onClick={() => setName(k)}
            >
              {tabs[k]?.title}
            </div>
          ))}
        </div>
        <div className="w-full p-2">{name && tabs[name]?.children}</div>
      </div>
      {children}
    </TabContext.Provider>
  );
}
