const AppPrimaryView: React.FC<{
  children?: React.ReactNode;
}> = ({ children }): React.JSX.Element => {
  return (
    <div className="grow border-r border-r-white/10 mr-6 pr-6">
      <div className="p-6 h-full">{children}</div>
    </div>
  );
};

export default AppPrimaryView;
