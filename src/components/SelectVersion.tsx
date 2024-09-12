import { FormControl, InputLabel, MenuItem, Select, styled } from "@mui/material";
import { Version } from "../queries/getVersions";

interface SelectProps {
  versions: Version[];
  version: string;
  onChangeVersion: any;
}
const CustomFormControl = styled(FormControl)({
  width: "300px",
  backgroundColor: "white",
  borderRadius: 15,
  height: "55px",
  borderColor: "#e06377",
  "& .MuiOutlinedInput-root": {
    borderRadius: 15,
    "& fieldset": {
      borderColor: "#e06377",
    },
    "&:hover fieldset": {
      borderColor: "#e06377",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e06377",
    },
  },
});

const CustomSelect = styled(Select)({
  "& .MuiSelect-select": {
    borderRadius: "30px",
    color: "#e06377",
  },
  ".MuiSelect-icon": {
    color: "#e06377",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e06377",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e06377",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e06377",
  },
});

const CustomMenuItem = styled(MenuItem)({
  color: "#e06377",
});

const SelectVersion = ({ version, versions, onChangeVersion }: SelectProps) => {
  return (
    <CustomFormControl variant="outlined">
      <InputLabel>Version</InputLabel>
      <CustomSelect value={version} onChange={onChangeVersion} label="Version">
        {versions?.map((version) => (
          <CustomMenuItem value={version?.version}>{version?.name}</CustomMenuItem>
        ))}
      </CustomSelect>
    </CustomFormControl>
  );
};

export default SelectVersion;
