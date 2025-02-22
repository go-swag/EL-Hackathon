import { ScrollArea } from '@/components/ui/scroll-area';
import CueSnippetList from '../cues/CueSnippetList';
interface SnippetsPanelProps {
  title: string;
}

const AppSideBar = ({ title }: SnippetsPanelProps) => {
  return (
    <div className="h-full bg-black/20 shrink min-w-[450px] overflow-y-auto">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <CueSnippetList />
      </ScrollArea>
    </div>
  );
};

export default AppSideBar;
