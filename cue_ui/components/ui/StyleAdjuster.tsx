import { useCues } from '@/context/CueContext';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import { useCallback } from 'react';

const PRESET_COLOURS: {
  id: number;
  label: string;
  hex_code: string;
}[] = [
  { id: 1, label: 'Red', hex_code: '#FF0000' },
  { id: 2, label: 'Green', hex_code: '#008000' },
  { id: 3, label: 'Blue', hex_code: '#0000FF' },
  { id: 4, label: 'Orange', hex_code: '#FFA500' },
  { id: 5, label: 'Black', hex_code: '#000000' },
];

const HandlerBase: React.FC<{
  labelText: string;
  children: Readonly<React.ReactNode>;
}> = ({ labelText, children }): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-xs font-medium opacity-70">{labelText}</label>
      <div className="mt-auto">{children}</div>
    </div>
  );
};

const FontHandler: React.FC = (): React.JSX.Element => {
  const { updateStyling, styling } = useCues();

  return (
    <HandlerBase labelText="Font Size">
      <Slider
        onChange={(value) =>
          updateStyling({
            ...styling,
            fontSize: `${value}px`,
          })
        }
        min={48}
        max={100}
        defaultValue={64}
      />
    </HandlerBase>
  );
};

const ColourHandler: React.FC = (): React.JSX.Element => {
  const { updateStyling, styling } = useCues();

  const handleColourUpdate = useCallback(
    (newHex: string) => {
      updateStyling({
        ...styling,
        color: newHex,
      });
    },
    [updateStyling, styling]
  );

  return (
    <HandlerBase labelText="Font Colour">
      <ul className="flex flex-row gap-1">
        {PRESET_COLOURS.map((pC) => (
          <li key={pC.id}>
            <button
              type="button"
              onClick={() => handleColourUpdate(pC.hex_code)}
              className="!w-5 !h-5 !rounded cursor-pointer"
              style={
                {
                  backgroundColor: pC.hex_code,
                } as React.CSSProperties
              }
            ></button>
          </li>
        ))}
      </ul>
    </HandlerBase>
  );
};

const StyleAdjuster: React.FC = (): React.JSX.Element => {
  return (
    <div className="sticky top-0 bg-black-900 flex flex-row gap-x-16 gap-y-6 pb-4 px-6 mb-6 border-b border-b-white/10 pt-6">
      <FontHandler />
      <ColourHandler />
    </div>
  );
};

export default StyleAdjuster;
