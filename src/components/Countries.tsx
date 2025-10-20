import React, { useMemo } from "react";
import Select, { SingleValue } from "react-select";
import countryList from "react-select-country-list";

interface CountryOption {
  label: string;
  value: string;
}

interface CountrySelectProps {
  country: string;
  setCountry: (value: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ country, setCountry }) => {
  const options = useMemo(() => countryList().getData(), []);

  const handleChange = (selected: SingleValue<CountryOption>) => {
    setCountry(selected?.value ?? "");
  };

  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">Country</label>
      <Select
        options={options}
        value={options.find((c) => c.value === country) || null}
        onChange={handleChange}
        placeholder="Select your country"
      />
    </div>
  );
};

export default CountrySelect;
