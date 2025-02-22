import { ScrollArea } from '@/components/ui/ScrollArea';
import CueSnippetList from '@components/cues/CueSnippetList';
interface SnippetsPanelProps {
  title: string;
}

const AppSideBar = ({ title }: SnippetsPanelProps) => {
  return (
    <div className="h-full bg-black/20 min-w-[30%] overflow-y-auto">
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
