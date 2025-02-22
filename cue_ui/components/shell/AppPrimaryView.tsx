const AppPrimaryView: React.FC<{
  children?: React.ReactNode;
}> = ({ children }): React.JSX.Element => {
  return (
    <div className="grow w-full max-w-[calc(100%-30%)] border-r border-r-white/10">
      <div className="py-6 h-full">{children}</div>
    </div>
  );
};

export default AppPrimaryView;
