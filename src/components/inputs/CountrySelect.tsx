'use client';

import useCountries from '@/hooks/useCountries';
import Select from 'react-select'

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[],
    region: string;
    value: string
}

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {
    const { getAll } = useCountries();

    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value: CountrySelectValue) => onChange(value)}
                formatOptionLabel={(option: any) => (
                    <div className="
          flex flex-row items-center gap-3">
                        <div>{option.flag}</div>
                        <div>
                            {option.label},
                            <span className="text-neutral-500 ml-1">
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 py-1 border outline-0',
                    input: () => 'text-lg outline-0',
                    option: () => 'text-lg'
                }}
                theme={(theme: any) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: 'rgba(0,0,0,0.1)'
                    }
                })}
            />
        </div>
    );
}

export default CountrySelect;