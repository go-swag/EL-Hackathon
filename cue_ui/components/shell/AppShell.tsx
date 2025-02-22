import { CueContextProvider } from '@/context/CueContext';
import AppPrimaryView from './AppPrimaryView';
import AppSideBar from './AppSideBar';

interface SplitLayoutProps {
  children?: Readonly<React.ReactNode>;
}

const AppShell: React.FC<SplitLayoutProps> = ({
  children,
}): React.JSX.Element => {
  return (
    <div className="flex flex-row overflow-hidden max-h-[calc(max(100vh,600px))] h-screen">
      <CueContextProvider>
        <AppPrimaryView>{children}</AppPrimaryView>
        <AppSideBar title="Cue Up" />
      </CueContextProvider>
    </div>
  );
};

export default AppShell;
